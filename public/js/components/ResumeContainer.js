import React from 'react';

import GeneralDetailsSection from './GeneralDetailsSection';
import WorkExperienceSection from './WorkExperienceSection';

export default class ResumeContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            resumeObject: this.props.resumeObject
        };

        this.saveResume = this.saveResume.bind(this);
    }

    saveResume(newFields) {
        // TODO: check which section we got
        window.alert('saved: ' + JSON.stringify(newFields));
    }

    render() {

        // possible sections : general details, work expoerience, education, projects, skills, contact information

        // const workExperience

        return (
            <div className="resume-container">
                <GeneralDetailsSection
                    formFields={this.state.resumeObject.generalDetails}
                    onUpdate={this.saveResume}
                />
                <WorkExperienceSection
                    workExperience={this.state.resumeObject.workExperience}
                    onUpdate={this.saveResume}
                />
            </div>
        );
    }

}