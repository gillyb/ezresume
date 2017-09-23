import React from 'react';
import ReactDOM from 'react-dom';
import ResumeContainer from './components/ResumeContainer';

import 'bootstrap/scss/bootstrap.scss';
import './../styles/main.scss';
import Header from "./components/header/Header";

const resume = JSON.parse(document.getElementById('resume-object').innerText);

ReactDOM.render(<Header/>, document.getElementById('header'));

ReactDOM.render(
    <ResumeContainer resumeObject={resume} />,
    document.getElementById('resume-container')
);