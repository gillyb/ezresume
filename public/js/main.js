import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/scss/bootstrap.scss';
import './../styles/main.scss';
import App from "./components/App";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ResumeContainer from "./components/ResumeContainer";

const resume = JSON.parse(document.getElementById('resume-object').innerText);

ReactDOM.render((
    <BrowserRouter>
        <Route path="/">
            <App>

                {/* Auth */}
                <Route path="/login" component={LoginForm} />
                <Route path="/register" component={RegisterForm} />

                {/* Editor */}
                <Route path="/resume" render={() => <ResumeContainer resumeObject={resume}/>} />

            </App>
        </Route>
    </BrowserRouter>
    ), document.getElementById('app-container')
);