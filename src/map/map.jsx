import React,  {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { Survey } from './survey';
import { DataPoint } from './data-point';
import { Data } from './data';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './map.css';



export function Map(props){
    const[username, setUserName] = useState(props.userName)
    const location = [0,0];
    const [value, setValue] = useState(5)
    const [dataPoints, setDataPoints] = 
        useState(
            () => {
                const savedData = localStorage.getItem('data'); 
                return savedData ? JSON.parse(savedData) : []; });


    useEffect(()=>{
        if (props.anonymous) {
            setUserName('Anon');
        }
    },[props.anonymous]
)
    useEffect(
        () => { 
            localStorage.setItem('data', JSON.stringify(dataPoints)); 
        }, [dataPoints]
    )
    useEffect( () => {
        const interval = setInterval(() => {
                const randValue = Math.floor(Math.random() * 10) +1;
                const newDataPoint = new DataPoint (randValue, location, 'otherUser');
                setDataPoints((prevDataPoints => [...prevDataPoints, newDataPoint]));
            }, 10000);
            return () => clearInterval(interval);
        }, [])        

    function addData() {
        setDataPoints((prevDataPoints => [...prevDataPoints, new DataPoint(value, location, username )]))
    }
    return (
        <main className="container-fluid">    
        <div id ="map"> 
            <button id="surveyButton" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#surveyModal">
                Report Lot Conditions
            </button>
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