import React, {useEffect, useState} from 'react'
import { Form, Button } from 'react-bootstrap';
export function SelectFields(props){
    const[types, setTypes] = useState(props.types)
    useEffect(() => {
        if (props.types) { setTypes(props.types); } }, [props.types]) 
        if (!types){ 
        return <div>Loading...</div>; 
    }
    function handleChange (event){
        if (types) {
            const { name, checked } = event.target; 
            setTypes((prev) => ({
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
                        <Form.Check label='Y (Student)' name="ylot" defaultChecked={types.ylot}  onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check label='G (Graduate)' name="glot" defaultChecked={types.glot}  onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check label='A (Employee)' name="alot" defaultChecked={types.alot}  onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check label='U (Free/Unmarked)' name="ulot" defaultChecked={types.ulot}  onChange={handleChange}/>
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