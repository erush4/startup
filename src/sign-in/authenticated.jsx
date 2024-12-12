import React from "react";
import { useNavigate } from "react-router-dom";

export function Authenticated() {
    const navigate = useNavigate();

    React.useEffect(() => {
        navigate('/Map');
    }, [navigate]);

    return null;
}
