import React, {useState, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap'
import { APIProvider, Map , useMapsLibrary, AdvancedMarker, useAdvancedMarkerRef, useMap} from '@vis.gl/react-google-maps';
import { apikey } from './mapConfig';
import './survey.css'

export function Survey (props){    
    const [sliderValue, setSliderValue] = useState(5);
    const [coordinates, setCoordinates] = useState({ lat: 40.25214576901133, lng: -111.64926838213698});
    const[draggable, setDraggable] = useState(coordinates)
    const [zoom, setZoom] = useState(16);
    const [markerRef, marker] = useAdvancedMarkerRef();
    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
        props.setValue(e.target.value);
    };
    
    function MapController(props){
        const map = useMap();

        useEffect(() => {
            if (!map) {
                return;
            }
            map.setZoom(props.zoom)
            map.setCenter(props.coords)
        });

    }
    console.log(coordinates)
    function setLocation() {
        navigator.geolocation.getCurrentPosition(position =>{
            const newCoords = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            setZoom(18);
            setCoordinates(newCoords);
            setDraggable(newCoords);
            marker.position = newCoords;
        });
    }
    
    useEffect(() => {
        if(!marker){
            return;
        }
        marker.addListener("dragend", (event) => {;
            setDraggable(marker.position); 
        });
        console.log(marker.position)
    }, [marker])

    
    
    


    return (
    <Form>
    <Form.Group >
    <div>Drag the marker to select your location on the map:</div>
        
        <div className='surveyMap'>
        <Button className='pickLocation' onClick={() => setLocation()}>Use My Device's Location</Button>
        <APIProvider apiKey={ apikey} id='Map' >
                <Map
                    defaultZoom={zoom}
                    defaultCenter={ coordinates }
                    mapId ='SURVEY_MAP'
                    disableDefaultUI={true}
                    zoomControl={true}
                    >
                    <AdvancedMarker ref={markerRef} draggable={true} position={draggable} />
                    <Circle />
                    <MapController zoom={zoom} coords={coordinates}/>
                </Map>
            </APIProvider>
            </div>
            
        </Form.Group>
        <Form.Group className='surveySlider'>
            <Form.Label htmlFor='slider'>How many open Y spots are there in the circle?</Form.Label>
            <Form.Range min="0" max="10" value={sliderValue} onChange={handleSliderChange}/>
            <Form.Text>Selected value: {sliderValue}</Form.Text>
        </Form.Group>
    </Form>
    )
    }
    