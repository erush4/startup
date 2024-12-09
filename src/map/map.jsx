import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './map.css';
import { useState, useEffect } from 'react';
import { DataPoint } from './dataPoint';
import { Form } from 'react-bootstrap';
import {Survey} from './survey/survey.jsx';

export function Map(props){
    const [settings, setSettings] = useState(null)

    function Displaying() {
        let string = '';
        Object.entries(settings)
        .filter(([key, value]) => key !== 'anonymous') // Exclude 'anonymous' 
        .forEach(([key, value]) =>{
            if (value === true) {
                string = string + key + ' ';
            }
        });
        return <span>{string}</span>;
    }

    useEffect(() => {
        if (props.settings) { setSettings(props.settings); } }, [props.settings]) 
        if (!settings){ 
        return <div>Loading...</div>; 
    }
    
    return (
        <main className="container-fluid">    
        <div id ="map"> 
            <button id="surveyButton" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#surveyModal">
                Report Lot Conditions
            </button>
                <h1>Map requires API to display <span className="small">and I haven't done that yet</span></h1> 
                <p>Currently displaying spots in: <Displaying/> </p>
                <p>sample survey data will be displayed here:</p>
                
        </div>
        <div className="modal" id="surveyModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <Survey settings={settings}/>
                </div>
            </div>
        </div>
    </main>
    )
}