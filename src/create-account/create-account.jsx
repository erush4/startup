import React from "react";
import './create-account.css';
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { AuthState } from "../sign-in/authState";

export function CreateAccount(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [passwordVerify, setPasswordVerify] = React.useState('');
    const [userVerify, setUserVerify] = React.useState(null);

    function ErrorHandle() {
        if (userVerify) {
            return (
                <div className='error text-danger'>Error: {userVerify.msg}</div>
            );
        }
        return null;
    }

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
        console.log('begin creation');
        const response = await fetch('/api/auth/create', {
            method: 'post',
            body: JSON.stringify({ username: userName, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response.status === 200) {
            console.log('success?');
            localStorage.setItem('userName', userName);
            console.log(userName);
            props.onAuthChange(userName, AuthState.Authenticated);
            location.href = '/Map';
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
                        <Form.Control type='text' placeholder="username" value={userName} onChange={(u) => setUserName(u.target.value)}></Form.Control>
                        <Form.Text>This is the name people will see associated with your surveys.</Form.Text>
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
                <Button variant='primary' type='submit' onClick={() => { createUser() }} disabled={!userName || !password || passwordVerify !== password}>Create</Button>
                
            </div>
        </main>
    );
}
