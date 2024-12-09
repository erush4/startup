import React, {useState} from 'react'
import { Form } from 'react-bootstrap'


export function Survey (props){    
    const [sliderValue, setSliderValue] = useState(5);
    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
    };
    return (
    <Form>
        <Form.Group>
            <Form.Text>A seond map for selecting location will be located here. Placeholder value of 0,0</Form.Text>
        </Form.Group>
        <br />
        <Form.Group>
            <Form.Label htmlFor='slider'>How many open spots are near you?</Form.Label>
            <Form.Range min="0" max="10" value={sliderValue} onChange={handleSliderChange}/>
            <Form.Text>Selected value: {sliderValue}</Form.Text>
        </Form.Group>
    </Form>
    )
    }
    