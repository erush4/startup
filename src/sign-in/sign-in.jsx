import React from 'react';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Signin({ username, authState, onAuthChange, setAnonymous }) {
  return (
    <main className='container text-center'>
      <div>
        {authState === AuthState.Unknown && <h1>Something's wrong here...</h1>}
        {authState === AuthState.Authenticated && (
          <Authenticated/>
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            username={username}
            onLogin={(loginUserName, anonSetting) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
              setAnonymous(anonSetting);
              localStorage.setItem('anonymous', anonSetting);
            }
            }
          />
        )}
      </div>
    </main>
  );
}