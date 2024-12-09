import React, {useEffect, useState}from 'react';
import { Button } from 'react-bootstrap';
import { Slider } from './slider';

export function Fields(props) {
    const[types, setTypes] = useState(props.types)
    useEffect(() => {
        if (props.types) { setTypes(props.types); } }, [props.types]) 
        if (!types){ 
        return <div>Loading...</div>; 
    }
    let fieldList = [];

    for (const [key, value] in types) {
        if (value === true)
        fieldList.push(<Slider type={value} key={key}/>);
    }
    console.log(fieldList);
    return (
        <div className="modal-content">
            <div className="modal-header">
                <h4 className="modal-title">Report Lot Conditions</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" title="close" />
            </div>
            <div className="modal-body">
                {fieldList} 
            </div>
            <div className="modal-footer">
                <Button variant="secondary" onClick={() => props.setPage(0)}>Back</Button>
                <Button variant="primary" onClick={() => props.setPage(1)}>Next</Button>
            </div>
        </div>
    );
}
