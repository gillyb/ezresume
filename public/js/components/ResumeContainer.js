import React from 'react';

import GeneralDetailsSection from './GeneralDetailsSection';
import WorkExperienceSection from './WorkExperienceSection';
import EducationSection from "./EducationSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";

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
                <EducationSection
                    education={this.state.resumeObject.education}
                    onUpdate={this.saveResume}
                />
                <ProjectsSection
                    projects={this.state.resumeObject.projects}
                    onUpdate={this.saveResume}
                />
                <SkillsSection
                    skills={this.state.resumeObject.skills}
                    onUpdate={this.saveResume}
                />
            </div>
        );
    }

}