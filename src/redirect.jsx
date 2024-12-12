import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthState } from "./sign-in/authState";
export function Redirect(props) {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/Signin');
    }, [navigate]);
    return (<div>loading...</div>);