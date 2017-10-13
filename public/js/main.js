import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import 'bootstrap/scss/bootstrap.scss';
import './../styles/font-awesome/scss/font-awesome.scss';
import './../styles/bootstrap-social/bootstrap-social.css';
import './../styles/main.scss';

import ResumeService from './ResumeService';

import App from './components/App';
import Home from './components/Home';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ResumeContainer from './components/ResumeContainer';

// Check if the user has a saved resume already
const localResume = ResumeService.getLocalResume();
const resumeHolderElement = document.getElementById('resume-object');
let resumeObject = JSON.parse(resumeHolderElement.innerText);

if (localResume) {
    resumeHolderElement.innerText = JSON.stringify(localResume);
    resumeObject = localResume;
}

ReactDOM.render((
    <BrowserRouter>
        <Route path="/">
            <App>

                <Route path="/" exact component={Home} />

                {/* Auth */}
                <Route path="/login" component={LoginForm} />
                <Route path="/register" component={RegisterForm} />

                {/* Editor */}
                <Route path="/resume" render={() => <ResumeContainer resumeObject={resumeObject}/>} />

            </App>
        </Route>
    </BrowserRouter>
    ), document.getElementById('app-container')
);