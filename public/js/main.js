import React from 'react';
import ReactDOM from 'react-dom';
import ResumeContainer from './components/ResumeContainer';

import 'bootstrap/scss/bootstrap.scss';
import './../styles/main.scss';

const resume = JSON.parse(document.getElementById('resume-object').innerText);

ReactDOM.render(
    <ResumeContainer resumeObject={resume} />,
    document.getElementById('resume-container')
);