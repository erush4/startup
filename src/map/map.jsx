import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './map.css';
import { Survey } from './survey';


export function Map(){
    
    return (
        <main className="container-fluid">    
        <div id ="map"> 
            <button id="surveyButton" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#surveyModal">
                Report Lot Conditions
            </button>
                <h1>Map requires API to display <span>and I haven't done that yet</span></h1> 
                <p>sample survey data will be displayed here:</p>
        </div>
        <div className="modal" id="surveyModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Report Lot Conditions</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <Survey />
                    </div>
                    <div className="modal-footer">
                        <Button variant='primary' data-bs-dismiss="modal">Report</Button>
                    </div>
                </div>
            </div>
        </div>
    </main>
    )
}