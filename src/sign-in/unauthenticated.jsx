import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import './unauthenticated.css';

export function Unauthenticated(props){
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [userVerify, setUserVerify] = React.useState(null);

  function ErrorHandle() {
    if (userVerify) {
        return (
            <div className='error text-danger'>Error: {userVerify.msg}</div>
        );
    }
    return null;
}

  async function loginUser() {
    console.log('begin creation');
    const response = await fetch('/api/auth/signin', {
        method: 'post',
        body: JSON.stringify({ username: userName, password: password }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    if (response.status === 200) {
        localStorage.setItem('userName', userName);
        props.onLogin(userName)
    } else {
        const body = await response.json();
        setUserVerify(body); 
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
                    <Button className="sign-in-button" variant='primary' onClick={() => loginUser()} disabled={!userName || !password}>Sign In</Button>
                </div>
                <ErrorHandle />
            </div> 
            <p id="createLink">Don't have an account? Create one <a href="/CreateAccount">here</a></p>
        </div>
    </main>
    );
}