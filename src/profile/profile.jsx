import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './profile.css';

export function Profile(){
    return (
        <main className="container">
            <h1>Profile</h1>
            <hr />
            <h2>Info</h2>
                <img src="basic-profile.png" width="100" height="100" id="profile"/>
                <div> User email: <span>name@domain.tld</span></div>
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
            <div><button type="button" className="btn btn-danger" >Sign Out</button></div>
        </main>
    );
}