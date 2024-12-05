import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './profile.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../sign-in/authState';

export function Profile(props){
    function signout() {
        localStorage.removeItem('userName');
        props.onAuthChange(props.userName, AuthState.Unauthenticated);
      }
    return (
        <main className="container">
            <h1>Profile</h1>
            <hr />
            <h2>Info</h2>
                <div> User Name: <span>{props.userName}</span></div>
                <div> User email: <span>{props.userEmail}</span></div>
                <div><button type="button" className="btn btn-warning">Change Password</button></div>
        <hr />
            <h2>Settings</h2>
            <form>
                <div>Spots to display on map:</div>
                <div className="setting">
                    <div className="form-check">
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" name="Ylot"/>Y (Student)
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" name="Glot"/>G (Graduate)
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" name="Alot"/>A (Faculty)
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" name="Ulot"/>U (Free)
                        </label>
                    </div>
                </div>
                <div>Privacy:</div>
                <div className="setting">
                    <div className="form-check">
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" name="anonymous"/>Submit surveys anonymously
                        </label>
                    </div>
                </div>
            </form>
            <div><button type="button" className="btn btn-secondary" >Apply</button></div>
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