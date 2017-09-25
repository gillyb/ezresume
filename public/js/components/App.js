import React from 'react';
import { Route } from 'react-router-dom';

import Header from "./header/Header";
import ResumeContainer from "./ResumeContainer";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        // TODO: extract this!!!
        const resume = JSON.parse(document.getElementById('resume-object').innerText);

        return (
            <div className="app-container">
                <Header />
                {this.props.children}
            </div>
        );
    }

}