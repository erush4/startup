import React, {useState, useEffect} from 'react'
import { Form } from 'react-bootstrap'
import { APIProvider, Map , useMapsLibrary} from '@vis.gl/react-google-maps';
import { apikey } from './mapConfig';
import './survey.css'

export function Survey (props){    
    const [sliderValue, setSliderValue] = useState(5);
    const [coordinates, setCoordinates] = useState({ lat: 40.25214576901133, lng: -111.64926838213698});
    const [zoom, setZoom] = useState(16);
    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
        props.setValue(e.target.value);
    };
    
    return (
    <Form>
    <div className='surveyMap'>
        <APIProvider apiKey={ apikey} id='Map'>
                <Map
                    defaultZoom={16}
                    defaultCenter={ coordinates }
                    mapID ='SURVEY_MAP'
                    disableDefaultUI={true}
                    zoomControl={true}
                    >
                </Map>
                
            </APIProvider>
            </div>
        <br />
        <Form.Group>
            <Form.Label htmlFor='slider'>How many open Y spots are there in the circle?</Form.Label>
            <Form.Range min="0" max="10" value={sliderValue} onChange={handleSliderChange}/>
            <Form.Text>Selected value: {sliderValue}</Form.Text>
        </Form.Group>
    </Form>
    )
    }
    