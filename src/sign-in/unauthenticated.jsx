import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './unauthenticated.css';
import { AuthState } from './authState';
import Button from 'react-bootstrap/Button'

export function Unauthenticated(props){
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  async function createUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }
    return (
        <main className="container">
        <div id="outerBox">
            <div className="sign-in">
                <h2 >Sign in to your account</h2>
                <form className="form-control">
                    <div className="row rw">
                        <label htmlFor="username" className="form-label">Username: </label>
                        <input type="text" id="username" className="form-control" placeholder="Enter username" />
                    </div>
                    <div className="row rw">
                        <label htmlFor="password" className="form-label">Password: </label>
                        <input type="password" id="password" className="form-control" placeholder="Enter password"/>                        </div>
                    
                    </form>
                <div className="row">
                    <button className="btn btn-primary" type="submit">Sign In</button>
                    <a href="lost-password.html">I forgot my password</a>
                </div>
            </div> 
            <p id="createLink">Don't have an account? Create one <a href="create-account.html">here</a></p>
        </div>
    </main>
    );
}