import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './profile.css';
import { Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { AuthState } from '../sign-in/authState';
import { ErrorHandler } from '../error-handler/error-handler';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export function Profile(props){
    const [error, setError] = useState(null);

    const navigate = useNavigate()
    useEffect( () =>{ 
        if (props.authState === AuthState.Unauthenticated) { 
            navigate('/Signin');
        }}, [props.authState])

    async function setAnon(anonymous) {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/settings/anon', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ anonymous }), // Correct JSON structure
        });
    
        if (!response.ok) {
            const broken = await response.json();
            setError(`Failed to update anonymous status: ${broken.msg}`);
        }
    }
    

    const handleChange = (event) => {
        props.setAnonymous(event.target.checked);
        localStorage.setItem('anonymous', event.target.checked);
        setAnon(event.target.checked);
    }

    
    
    async function signout() {
        fetch(`/api/auth/logout`, {
          method: 'delete',
        })
          .catch(() => {   
          })
          .finally(() => {
            localStorage.removeItem('userName');
            localStorage.removeItem('anonymous');
            localStorage.removeItem('token');
            props.onAuthChange(props.userName, AuthState.Unauthenticated)
          });
      }
    return (
        <main className="container">
            <h1>Profile</h1>
            <hr />
            <h2>Info</h2>
                <div> User Name: <span>{props.userName}</span></div>
            <h2>Settings</h2>
            <div>Privacy:</div>
            <Form>
                <Form.Group>
                    <Form.Switch label='Submit surveys anonymously' name="anonymous" checked={props.anonymous} onChange={handleChange}/>
                    <Form.Text>Surveys will not be linked to your account. This setting is only in regards to data storage and will not alter the map display.</Form.Text>
                    <ErrorHandler error={error}/>
                </Form.Group>
            </Form>
        <hr />
            <Button variant='primary' 
                onClick={
                    () => {
                        signout(); 
                        location.href="/Signin"
                    }
                }
            >Sign Out</Button>
        </main>
    );
}