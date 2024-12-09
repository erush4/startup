import React, {useEffect, useState} from 'react'
import { Form, Button } from 'react-bootstrap';
export function SelectFields(props){
    const[fields, setFields] = useState(props.settings)
    useEffect(() => {
        if (props.settings) { setFields(props.settings); } }, [props.settings]) 
        if (!fields){ 
        return <div>Loading...</div>; 
    }
    function handleChange (event){
        if (fields) {
            const { name, checked } = event.target; 
            setFields((prev) => ({
                ...prev, [name]: checked 
               }));
           }
    } 
    return (
        <div className="modal-content">
            <div className="modal-header">
                <h4 className="modal-title">Select Lots to Report</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" title='close'/>
            </div>
            <div className="modal-body">
                <Form>
                    <Form.Group>
                        <Form.Check label='Y (Student)' name="ylot" defaultChecked={fields.ylot} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check label='G (Graduate)' name="glot" defaultChecked={fields.glot} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check label='A (Employee)' name="alot" defaultChecked={fields.alot} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check label='U (Free/Unmarked)' name="ulot" defaultChecked={fields.ulot} onChange={handleChange}/>
                    </Form.Group>
                </Form>
            </div>
            <div className="modal-footer">
                <Button variant="secondary"data-bs-dismiss="modal">Back</Button>
                <Button variant='primary' onClick={() => props.setPage(1)}>Next</Button>
            </div>
        </div>
    )
}