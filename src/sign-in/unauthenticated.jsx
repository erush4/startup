import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import './unauthenticated.css';
import { ErrorHandler } from '../error-handler/error-handler';
import { Link } from 'react-router-dom';

export function Unauthenticated(props){
  const [username, setUserName] = React.useState(props.username);
  const [password, setPassword] = React.useState('');
  const [userVerify, setUserVerify] = React.useState(null);

async function loginUser() {
    const response = await fetch('/api/auth/signin',{
        method: 'POST',
        body: JSON.stringify({ username: username, password: password}),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    });
    if (response.status === 200) {
        await response.json();
        localStorage.setItem('username', username);
        const anonCall = await fetch('/api/settings', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}});
            const anonData = await anonCall.json()
            props.onLogin(username, anonData.anonymous);
            localStorage.setItem('anonymous', anonData.anonymous)
        } else {
            await response.json()
            setUserVerify(response);
        }
    }

    return (
        <main className="container">
        <div id="outerBox">
            <div className="sign-in">
                <h2 >Sign in to your account</h2>
                <form className="form-control">
                    <div className="row rw">
                        <label htmlFor="username" className="form-label">Username: </label>
                        <input type="text" id="username" className="form-control" onChange={(c) => setUserName(c.target.value)} placeholder="Enter username" />
                    </div>
                    <div className="row rw">
                        <label htmlFor="password" className="form-label">Password: </label>
                        <input type="password" id="password" className="form-control" onChange={(c) => setPassword(c.target.value)} placeholder="Enter password"/>
                    </div>
                </form>
                <div className="row">
                    <Button className="sign-in-button" variant='primary' onClick={() => loginUser()} disabled={!username || !password}>Sign In</Button>
                </div>
                <ErrorHandler error={userVerify}/>
            </div> 
            <p id="createLink">Don't have an account? Create one <Link to="/CreateAccount">here</Link>
</p>

        </div>
    </main>
    );
}
