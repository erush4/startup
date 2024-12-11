import React, {useState, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap'
import { APIProvider, Map , useMapsLibrary, AdvancedMarker, useAdvancedMarkerRef, useMap} from '@vis.gl/react-google-maps';
import { apikey } from '../mapConfig';
import { Circle } from './circle';
import './survey.css'

export function Survey (props){    
    const [sliderValue, setSliderValue] = useState(5);
    const [coordinates, setCoordinates] = useState({ lat: 40.25214576901133, lng: -111.64926838213698});
    const[pin, setPin] = useState(coordinates)
    const [zoom, setZoom] = useState(17);
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

    function setLocation() {
        navigator.geolocation.getCurrentPosition(position =>{
            const newCoords = new google.maps.LatLng ({
                lat: position.coords.latitude,
                lng: position.coords.longitude
                })
            setZoom(18);
            setCoordinates(newCoords);
            setPin(newCoords);
            marker.position = newCoords;
            props.setLocation(newCoords)
        });
    }
    
    useEffect(() => {
        if(!marker){
            return;
        }
        marker.addListener("dragend", (event) => {;
            setPin(marker.position); 
        });
    }, [marker])

    return (
    <Form>
    <Form.Group >
    <h6 className='mapInstruct'>Drag the marker to select your location on the map:</h6>
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
                    <AdvancedMarker ref={markerRef} draggable={true} position={pin} />
                    <Circle center={pin} radius={20}/>
                    <MapController zoom={zoom} coords={pin}/>
                </Map>
            </APIProvider>
            </div>
            
        </Form.Group>
        <Form.Group className='surveySlider'>
            <Form.Label htmlFor='slider'>How many open Y spots are there in the circle?</Form.Label>
            <Form.Range min='0' max="10" value={sliderValue} onChange={handleSliderChange}/>
            <Form.Text>Selected value: {sliderValue} spot(s)</Form.Text>
        </Form.Group>
    </Form> 
    ) 
    }
    