import React, {useEffect, useState} from 'react'
import { Fields } from './fields';
import { SelectFields } from './set-fields';


export function Survey (props){
    const[types, setTypes] = useState(props.settings)
    useEffect(() => {
        if (props.settings) { setTypes(props.settings); } }, [props.settings]) 
        if (!types){ 
        return <div>Loading...</div>; 
    }
    const [page, setPage]= useState(0);
    if (page === 0){
        return (<SelectFields setPage={setPage} setTypes={setTypes} types={types}/>)
    } else {
        return (<Fields setPage={setPage} types={types} />)
    }

}