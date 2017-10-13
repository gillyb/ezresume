import React from 'react';
import { Link } from "react-router-dom";

import AuthService from './../AuthService';

export default class HomeComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // TODO: maybe we should redirect in a better way
        if (AuthService.isAuthenticated())
            window.location.href = '/resume';
    }

    render() {

        if (AuthService.isAuthenticated())
            return null;

        return (
            <div className="row justify-content-center">
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title justify-content-center">Hello & Welcome</h4>
                            <p className="card-text">Welcome to the easiest and funnest way to create a resume.</p>
                            <p className="card-text">
                                All you have to do to begin is click on the top menu&nbsp;
                                <Link to="/resume">Create Resume</Link>&nbsp;
                                and a full resume will be created just for you. With details and all.<br/>
                                Of course they won't be your details, but that can be changed very easily. All you have to do, is click
                                on the different sections to edit or delete them to match your personal details.
                            </p>
                            <p className="card-text">
                                You don't even need to be registered to start. Just start and have fun!<br/>
                                Your resume will be saved locally, and if you'll want to keep it, or share it with others
                                then you will need to sign in. But go ahead and try first before you commit.<br/>
                                (Even though committing is free and really simple)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}