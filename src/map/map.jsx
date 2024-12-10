import React,  {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { Survey } from './survey';
import { DataPoint } from './data-point';
import { Data } from './data';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './map.css';
import {APIProvider, Map} from '@vis.gl/react-google-maps';
import { apikey } from './mapConfig';

export function MapPage(props){
    const[username, setUserName] = useState(props.userName)
    const location = [0,0];
    const [value, setValue] = useState(5);
    const [dataPoints, setDataPoints] = useState([]);
    
    useEffect(()=>{
        if (props.anonymous) {
            setUserName('Anon');
        }
    },[props.anonymous]
);
    useEffect(
        
        () => { 
            fetch('/api/data')
                .then((response) =>response.json())
                .then ((data) => {
                    setDataPoints(data);
                });   
            }, []
        );      

    async function addData() {
        const datapoint= new DataPoint(value, location, username);
        await fetch('/api/datapoint', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(datapoint)
        })
                .then((response) =>response.json())
                .then ((data) => {
                    setDataPoints(data);
                }); 
    }
    return (
        <main className="container-fluid">    
        <div id ="map"> 
            <button id="surveyButton" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#surveyModal">
                Report Lot Conditions
            </button>
            <APIProvider apiKey={ apikey}>
                <Map
                    defaultZoom={13}
                    defaultCenter={ { lat: -33.860664, lng: 151.208138 } }
                    >
                </Map>
            </APIProvider>
                <h1>Map requires API to display <span>and I haven't done that yet</span></h1> 
                <p>sample survey data will be displayed here:</p>
                < Data dataPoints={dataPoints}/>
        </div>
        <div className="modal" id="surveyModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Report Lot Conditions</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <Survey setValue={setValue}/>
                    </div>
                    <div className="modal-footer">
                        <Button variant='primary' onClick={() => addData()} data-bs-dismiss="modal">Report</Button>
                    </div>
                </div>
            </div>
        </div>
    </main>
    )
}