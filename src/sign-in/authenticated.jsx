
import { useEffect } from 'react';
import { useNavigate} from "react-router-dom";

export function Authenticated (){
    const navigate = useNavigate();
    useEffect(
        () => {navigate('/Map',); } 
    )
}