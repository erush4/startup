import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './profile.css';
import { Button, FormGroup, FormLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { AuthState } from '../sign-in/authState';

export function Profile(props){
    const[settings, setSettings] = React.useState({
        ylot: true,
        alot: false,
        glot: false,
        ulot: false,
        anonymous: false
    })
    function signout() {
        localStorage.removeItem('userName');
        props.onAuthChange(props.userName, AuthState.Unauthenticated);
      }
    function formSubmit() {
        props.setSettings()
    }
    return (
        <main className="container">
            <h1>Profile</h1>
            <hr />
            <h2>Info</h2>
                <div> User Name: <span>{props.userName}</span></div>
            <h2>Settings</h2>
                <div>Spots to display on map:</div>
            <Form>
                <FormGroup>
                    <Form.Switch label='Y (Student)'/>
                </FormGroup>
                <FormGroup>
                    <Form.Switch label='G (Graduate)'/>
                </FormGroup>
                <FormGroup>
                    <Form.Switch label='A (Employee)'/>
                </FormGroup>
                <FormGroup>
                    <Form.Switch label='U (Free/Unmarked)'/>
                </FormGroup>
            </Form>
            <div>Privacy:</div>
            <Form>
                <FormGroup>
                    <Form.Switch label='Submit surveys anonymously' />
                    <Form.Text>Surveys will still be linked to your account, but your username will not be displayed on the map.</Form.Text>
                </FormGroup>
            </Form>
            <Button variant='secondary' type='submit'
                onClick={
                    () => formSubmit()
                }>Apply</Button>
        <hr />
            <div><Button variant='primary' 
                onClick={
                    () => {
                        signout(); 
                        location.href="/signin"
                    }
                }
            >Sign Out</Button></div>
        </main>
    );
}