import React, {useState, useEffect} from 'react'
import { Form, Button, Spinner } from 'react-bootstrap'
import { APIProvider, Map , AdvancedMarker, useAdvancedMarkerRef, useMap} from '@vis.gl/react-google-maps';
import { apikey } from '../mapConfig';
import { Circle } from './circle';
import './survey.css'
import { ErrorHandler } from '../../error-handler/error-handler';

export function Survey (props){    
    const [sliderValue, setSliderValue] = useState(5);
    const[pin, setPin] = useState({ lat: 40.25214576901133, lng: -111.64926838213698})
    const [zoom, setZoom] = useState(17);
    const [markerRef, marker] = useAdvancedMarkerRef();
    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
        props.setValue(e.target.value);
    };
    const [error, setError] = useState(null);
    
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

    function SpinHider(){
        if (props.fetching === false){
            return null;
        }
        return(
        <Spinner 
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
                className='spinner'
                />
        )
    }

    function setLocation() {
        props.setFetching(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const newCoords = new google.maps.LatLng({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
    
                setZoom(18);
                setPin(newCoords);
                marker.position = newCoords;
                props.setLocation(newCoords)
                props.setFetching(false)
            },
            (error) => {
                setError(error.message);
                props.setFetching(false);
            }
        );
    }
    
    
    useEffect(() => {
        if(!marker){
            return;
        }
        marker.addListener("dragend", (event) => {;
            setPin(marker.position); 
            props.setLocation(marker.position)
        });
    }, [marker])

    return (
    <Form>
    <Form.Group >
    <h6 className='mapInstruct'>Drag the marker to select your location on the map:</h6>
    <ErrorHandler error={error}/>
        <div className='surveyMap'>
        <Button className='pickLocation' onClick={() => setLocation()} disabled={props.fetching}>
            Use My Device's Location 
            <SpinHider />
            </Button>
        <APIProvider apiKey={ apikey} id='Map' >
                <Map
                    defaultZoom={zoom}
                    defaultCenter={ pin }
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
    