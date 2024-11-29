import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sign-in.css';

export function Signin(){
    return (
        <main className="container">
        <div id="outerBox">
            <div className="sign-in">
                <h2 class>Sign in to your account</h2>
                <form className="form-control">
                    <div className="row rw">
                        <label for="username" className="form-label">Username: </label>
                        <input type="text" id="username" className="form-control" placeholder="Enter username" />
                    </div>
                    <div className="row rw">
                        <label for="password" className="form-label">Password: </label>
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