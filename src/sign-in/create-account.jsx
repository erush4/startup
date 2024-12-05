import React from "react";

export function CreateAccount(){
    return (
        <main className="container">
        <h1>Create Account</h1>
        <form>
            <label htmlFor="username">Username</label>
            <input type="text" id='username' className="form-control"></input>

            <label htmlFor="email">Email</label>
            <input type="text" id='email' className="form-control"></input>
        </form>
        </main>
    )
}