import React, {useEffect, useState} from 'react'
import { Fields } from './fields';
import { SelectFields } from './set-fields';


export function Survey (props){
    const[settings, setSettings] = useState(props.settings)
    useEffect(() => {
        if (props.settings) { setSettings(props.settings); } }, [props.settings]) 
        if (!settings){ 
        return <div>Loading...</div>; 
    }
    const [page, setPage]= useState(0);
    const[types, setTypes]= useState('');
    if (page === 0){
        return (<SelectFields setPage={setPage} setFields={setTypes} settings={props.settings}/>)
    } else {
        return (<Fields setPage={setPage} fields={types} />)
    }

}