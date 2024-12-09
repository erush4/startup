import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './profile.css';
import { Button, FormGroup} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { AuthState } from '../sign-in/authState';

export function Profile(props){
    const[settings, setSettings] = React.useState(props.settings)
    const handleChange = (event) => {
         const { name, checked } = event.target; 
         setSettings((prev) => ({
             ...prev, [name]: checked 
            }));
    }
    function signout() {
        localStorage.removeItem('userName');
        localStorage.removeItem('settings');
        props.onAuthChange(props.userName, AuthState.Unauthenticated);
      }
    function applySettings(){
        props.applySettings(settings);
        localStorage.setItem('settings', JSON.stringify(settings));
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
                    <Form.Switch label='Y (Student)' name="ylot" defaultChecked={settings.ylot} onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Form.Switch label='G (Graduate)' name="glot" defaultChecked={settings.glot} onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Form.Switch label='A (Employee)' name="alot" defaultChecked={settings.alot} onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Form.Switch label='U (Free/Unmarked)' name="ulot" defaultChecked={settings.ulot} onChange={handleChange}/>
                </FormGroup>
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