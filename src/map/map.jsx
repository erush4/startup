import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './map.css';

export function Map(){
    return (
        <main className="container-fluid">
        <div className="toast show">
            <div className="toast-header">
                <span className="me-auto">Map may load slowly. Please be patient.</span>
                <button type="button" className="btn-close" data-bs-dismiss="toast"></button>
            </div>
        </div>    
        <div> 
            <button id="surveyButton" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#surveyModal">
                Report Lot Conditions
            </button>
            <iframe id="map" src="https://app.mapline.com/map/map_1ca15a1b/RnVkYUlvS0FpeEU0QnNEN0UvQ2k1TU9HSHBOVXVkVHB2cjZaVU" ></iframe>  
        </div>
        <div id="mapLabel">
            <a href="https://mapline.com" target="_blank">Mapping by Mapline</a>
        </div>
        <div className="modal" id="surveyModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Report Lot Conditions</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div>About how many open spots would you say there are around you?</div>
                            <div >Completely Empty <input type="range" min="0" max="10"/>Completely Full</div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
    )
}