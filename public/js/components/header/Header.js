import React from 'react';
import {Link} from "react-router-dom";

import Notification from './Notification';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        // check if a user is logged in
        // TODO: use a smarter service for this
        let userObject;
        const userData = document.getElementById('user-object').innerText;
        if (userData) {
            userObject = JSON.parse(userData);
        }

        return (
            <div className="header">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">ezResume.io</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/resume" className="nav-link">Edit Resume</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Pricing</a>
                            </li>
                        </ul>
                        <span className="navbar-text presence">
                            {
                                userObject ?
                                    <span className="full-name">{userObject.displayName}</span> :
                                    <ul className="navbar-nav">
                                        <li className="nav-item login-button">
                                            <Link to="/login">
                                                <button type="button" className="btn btn-outline-secondary">Log in</button>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/register">
                                                <button type="button" className="btn btn-outline-secondary">Sign up</button>
                                            </Link>
                                        </li>
                                    </ul>
                            }
                        </span>
                    </div>
                </nav>
                <Notification />
            </div>
        );
    }

}