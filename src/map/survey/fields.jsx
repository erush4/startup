import React from 'react'
import { Button } from 'react-bootstrap';
import { Slider } from './slider';
export function Fields(props){
    const types = props.types;
    let fields=[];
    for (const thing in types){
        fields.push(<Slider type={thing}/>)
    }
    return (
        <div className="modal-content">
            <div className="modal-header">
                <h4 className="modal-title">Report Lot Conditions</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" title='close'/>
            </div>
            <div className="modal-body">
                {fields}
            </div>
            <div className="modal-footer">
                <Button variant="secondary"onClick={() => props.setPage(0)}>Back</Button>
                <Button variant='primary' onClick={() => props.setPage(1)}>Next</Button>
            </div>
        </div>
    
    )
}