import React, { useEffect } from "react";
import './create-account.css';
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { AuthState } from "../sign-in/authState";
import { ErrorHandler } from "../error-handler/error-handler";
import { useNavigate } from "react-router-dom";

export function CreateAccount(props) {
    const [username, setUserName] = React.useState(props.username);
    const [password, setPassword] = React.useState('');
    const [passwordVerify, setPasswordVerify] = React.useState('');
    const [userVerify, setUserVerify] = React.useState(null);

    const navigate = useNavigate()
    useEffect( () =>{ 
        if (props.authState === AuthState.Authenticated) { 
            navigate('/Map');
        }}, [props.authState])

    function PasswordVerification() {
        if (password === '') {
            return (<br />);
        } else if (password === passwordVerify) {
            return (
                <Form.Text className='text-success'>Passwords Match!</Form.Text>
            );
        } else {
            return (
                <Form.Text className='text-danger'>Passwords must match.</Form.Text>
            );
        }
    }

    async function createUser() {
        const response = await fetch('/api/auth/create', {
          method: 'POST',
          body: JSON.stringify({ username: username, password: password }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
      
        if (response?.status === 200) {
            localStorage.setItem('username', username);
            props.onLogin(username);
          } else {
            const body = await response.json();
            setUserVerify(body);
          }
        }
      

    return (
        <main className="container">
            <h1>Create Account</h1>
            <div className="outer-box">
                <Form>
                    <Form.Group className='mb-3' controlId='formUsername'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type='text' placeholder="username" value={username} onChange={(u) => setUserName(u.target.value)}></Form.Control>
                        <Form.Text>This is the name people will see associated with your surveys.</Form.Text>
                        <ErrorHandler error={userVerify}/>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="password" value={password} onChange={(p) => setPassword(p.target.value)}></Form.Control>
                        <Form.Text>Never reuse a password from another website.</Form.Text>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="confirm password" value={passwordVerify} onChange={(v) => setPasswordVerify(v.target.value)}></Form.Control>
                        <PasswordVerification />
                    </Form.Group>
                </Form>
                <Button variant='primary' type='submit' onClick={() => { createUser() }} disabled={!username || !password || passwordVerify !== password}>Create</Button>
                
            </div>
        </main>
    );
}
