import React from 'react';
import {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './profile.css';
import { Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { AuthState } from '../sign-in/authState';

function Confirm (props){
    if (props.confirm === true){
        return (
            <Form.Text className='saved'>Saved!</Form.Text>
        )
    } else if (props.confirm === false) {
        return (
            <Form.Text className='unsaved'>Changes may be lost</Form.Text>
        )
    }
}
export function Profile(props){
    
    const [settings, setSettings] = useState(null)

    const handleChange = (event) => {
        if (settings) {
         const { name, checked } = event.target; 
         setSettings((prev) => ({
             ...prev, [name]: checked 
            }));
        confirm = false;
        }
    }
    
    function signout(){
        localStorage.removeItem('userName');
        localStorage.removeItem('settings');
        props.onAuthChange(props.userName, AuthState.Unauthenticated);
      }
    function applySettings(){
        props.applySettings(settings);
        localStorage.setItem('settings', JSON.stringify(settings));
        confirm = true;
    }
    useEffect(() => {
        if (props.settings) { setSettings(props.settings); } }, [props.settings]) 
        if (!settings){ 
           return <div>Loading...</div>; 
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
                <Form.Group>
                    <Form.Switch label='Y (Student)' name="ylot" defaultChecked={settings.ylot} onChange={handleChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Switch label='G (Graduate)' name="glot" defaultChecked={settings.glot} onChange={handleChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Switch label='A (Employee)' name="alot" defaultChecked={settings.alot} onChange={handleChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Switch label='U (Free/Unmarked)' name="ulot" defaultChecked={settings.ulot} onChange={handleChange}/>
                </Form.Group>
            </Form>
            <div>Privacy:</div>
            <Form>
                <FormGroup>
                    <Form.Switch label='Submit surveys anonymously' name="anonymous" defaultChecked={settings.anonymous} onChange={handleChange}/>
                    <Form.Text>Surveys will still be linked to your account, but your username will not be displayed on the map.</Form.Text>
                </FormGroup>
            </Form>
            <Button variant='secondary' type='submit'
                onClick={
                    () => applySettings()
                }>Apply</Button>
            <div>
                <Confirm confirm={confirm}/>
            </div>
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