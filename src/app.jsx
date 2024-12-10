import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Map } from './map/map';
import { Profile } from './profile/profile';
import { Help } from './help/help';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './app.css';
import { AuthState } from './sign-in/authState';
import { Signin } from './sign-in/sign-in';
import { CreateAccount } from './create-account/create-account';

export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
    const [anonymous, setAnonymous]= React.useState(JSON.parse(localStorage.getItem('anonymous')) || false)

  return (
    <BrowserRouter>
    <div className="body d-flex flex-column">
      <header>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark container-fluid">
            <div className="container-fluid">
                <span className="navbar-brand" href="about.html">
                    <img className="logo navbar-brand" src="logo.png" height="100%" /> 
                    BYU ParkIt
                </span>
                <button className="navbar-toggler" title="navbar-toggle"type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                    <menu className="navbar-nav">
                        {authState === AuthState.Authenticated && (
                            <li className="nav-item">
                            <NavLink className="nav-link" to='Map'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                                </svg>
                                Map
                            </NavLink>
                            </li>
                        )}    
                        <li className="nav-item">
                            <NavLink className="nav-link" to='Help'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                                </svg>
                                Help
                            </NavLink>
                        </li>
                        {authState === AuthState.Authenticated && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to='Profile'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                    </svg>
                                    Profile
                                </NavLink>
                            </li>
                        )}
                        {authState === AuthState.Unauthenticated && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to='Signin'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
                                        <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                    </svg>
                                    Sign In
                                </NavLink>
                            </li>
                        )}
                    </menu>
                </div>
            </div>
        </nav>            
      </header> 
      <Routes>
        <Route 
            path='/Signin' 
            element={
                <Signin
                    userName={userName}
                    authState={authState}
                    setAnonymous={anonymous}
                    onAuthChange={(userName, authState) => {
                        setAuthState(authState);
                        setUserName(userName);
;                    }}
                />
            } exact 
        />
        <Route path='/help' element={<Help/>}  />
        <Route 
            path='/profile' 
            element={<Profile
                userName={userName}
                authState={authState}
                anonymous={anonymous}
                setAnonymous={setAnonymous}
                onAuthChange={(userName, authState) => {
                    setAuthState(authState);
                    setUserName(userName);
                }}
            />}  
        />
        <Route path='/map' element={<Map 
            userName={userName}
            anonymous= {anonymous} /> } />
        <Route path='/*' element={<NotFound/>} />
        <Route path='/CreateAccount' element={<CreateAccount
            userName={userName}
            authState={authState}
            onAuthChange={(userName, authState) => {
                setAuthState(authState);
                setUserName(userName);
            }}
        />}/>
      </Routes>
      <footer className="footer mt-auto py-3 bg-dark text-light">
        <div>Author: Ethan Rushforth</div>
            <div><a href="https://github.com/erush4/startup">Github Repository</a></div>
      </footer>
    </div>
    </BrowserRouter>
  )
}

function NotFound() {
    return <main className='container-fluid text-center'>404: Return to sender. Address unknown.</main>;
  }
