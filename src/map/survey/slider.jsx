export function Slider(props){
    const [sliderValue, setSliderValue] = useState(5);
    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
    };

    return (
        <Form.Group>
            <Form.Label htmlFor='slider'>How many open {props.type} spots are near you</Form.Label>
            <Form.Range min="0" max="10" value={sliderValue} onChange={handleSliderChange}/>
            <Form.Text>Selected value: {sliderValue}</Form.Text>
        </Form.Group>
    )
}