import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './profile.css';
import { Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { AuthState } from '../sign-in/authState';


export function Profile(props){
    const handleChange = (event) => {
        props.setAnonymous(event.target.checked);
        localStorage.setItem('anonymous', event.target.checked);
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
                    <Form.Switch label='Submit surveys anonymously' name="anonymous" defaultChecked={props.anonymous} onChange={handleChange}/>
                    <Form.Text>Surveys will still be linked to your account, but your username will not be displayed on the map.</Form.Text>
                </Form.Group>
            </Form>
        <hr />
            <Button variant='primary' 
                onClick={
                    () => {
                        signout(); 
                        location.href="/signin"
                    }
                }
            >Sign Out</Button>
        </main>
    );
}