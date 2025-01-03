import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Survey } from './survey/survey';
import { DataPoint, Distributor} from './dataDistributor'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './map-page.css';
import { APIProvider, Map, } from '@vis.gl/react-google-maps';
import { apikey } from './mapConfig';
import { Heatmap } from './heatmap';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../sign-in/authState';
import { ErrorHandler } from '../error-handler/error-handler';

export function MapPage(props) {
    const [username, setUserName] = useState(props.username);
    const [location, setLocation] = useState({ lat: 40.25214576901133, lng: -111.64926838213698 });
    const [value, setValue] = useState(5);
    const [dataPoints, setDataPoints] = useState([]);
    const[fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate()
    //if not signed in, reroute to signin page
    useEffect( () =>{ 
            if (props.authState === AuthState.Unauthenticated) { 
                navigate('/Signin');
            }}, [props.authState]);

    //set user name to anonymous for surveys
    useEffect(() => {
        if (props.anonymous) {
            setUserName('Anon');
        }
    }, [props.anonymous]);

    // initialize data with server data
    useEffect(() => {
        fetch('/api/data',{
            method: 'GET'
        })
            .then((response) => {
                if (!response.ok){
                    if (response.status === 401) {
                        throw new Error('Unauthorized: please sign out and sign in again');
                    } else {
                        throw new Error('response was not ok')
                    }
                }
                return response.json()
            })
            .then((data) => {
                setDataPoints(data)
            })
            .catch((error) => {
                setError(error.message);
                console.error('Error fetching data:', error);
            });
    }, []);

    //create WebSocket for updating data in real time -- merging server and websocket data
    // Listen to WebSocket data 
    useEffect(() => {
         const handleNewData = (newData) => { 
            setDataPoints(newData); 
        }; 
        Distributor.addListener(handleNewData); 
        return () => { 
            Distributor.removeListener(handleNewData); 
        }; 
    }, []);
      
    
    //adding data when submitting surveys
    async function addData() {
        const datapoint = new DataPoint(value, location, username);
        Distributor.broadcastDatum(datapoint);
        await fetch('/api/datum', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body:JSON.stringify(datapoint)
        })
            .then((response) => {
                if (!response.ok){
                    if (response.status === 401) {
                        throw new Error('Unauthorized: please sign out and sign in again.');
                    } else {
                        throw new Error('response was not ok');
                    }
                }
                return response.json();
            })
            .then((data) => {
                setDataPoints(data);
            })
            .catch((error) => {
                setError(error.message);
                console.error('Error adding data:', error);
            });
    }

    return (
        <main className="container-fluid">
            <ErrorHandler error={error} />
            <div id="map">
                <button id="surveyButton" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#surveyModal">
                    Report Lot Conditions
                </button>
                <APIProvider apiKey={apikey}>
                    <Map
                        defaultZoom={16}
                        defaultCenter={{ lat: 40.25214576901133, lng: -111.64926838213698 }}
                        mapId="PARKING_MAP"
                        disableDefaultUI={true}
                        zoomControl={true}
                    />
                    <Heatmap data={dataPoints} />
                </APIProvider>
            </div>
            <div className="modal" id="surveyModal">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Report Lot Conditions</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <Survey setValue={setValue} setLocation={setLocation} setFetching={setFetching} fetching={fetching}/>
                            <div className="cont">
                                <Button variant="success" className="submitSurvey" disabled={fetching || error} onClick={() => addData()} data-bs-dismiss={!error ? "modal" : ""}>
                                    Submit
                                </Button>
                            </div>
                            <ErrorHandler error = {error}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
