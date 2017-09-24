import React from 'react';

import GeneralDetailsSection from './GeneralDetailsSection';
import WorkExperienceSection from './WorkExperienceSection';
import EducationSection from "./EducationSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";

import ResumeService from './../ResumeService';

export default class ResumeContainer extends React.Component {

    constructor(props) {
        super(props);

        // this.resumeService = new ResumeService();
        const publicView = window.location.search.indexOf('public') !== -1;

        this.state = {
            resumeObject: this.props.resumeObject,
            publicView: publicView
        };

        this.saveResume = this.saveResume.bind(this);
    }

    saveResume(newFields) {
        if (this.state.publicView)
            return;

        ResumeService.save();

        // TODO: check which section we got
        // TODO: save to db
        // window.alert('saved: ' + JSON.stringify(newFields));
    }

    render() {

        const containerClassName = (this.state.publicView ? 'public-view ' : 'edit-mode ') + 'resume-container';

        return (
            <div className={containerClassName}>
                <h1 className="full-name">{this.state.resumeObject.fullName}</h1>
                <GeneralDetailsSection
                    formFields={this.state.resumeObject.generalDetails}
                    publicView={this.state.publicView}
                    onUpdate={this.saveResume}
                />
                <WorkExperienceSection
                    workExperience={this.state.resumeObject.workExperience}
                    publicView={this.state.publicView}
                    onUpdate={this.saveResume}
                />
                <EducationSection
                    education={this.state.resumeObject.education}
                    publicView={this.state.publicView}
                    onUpdate={this.saveResume}
                />
                <ProjectsSection
                    projects={this.state.resumeObject.projects}
                    publicView={this.state.publicView}
                    onUpdate={this.saveResume}
                />
                <SkillsSection
                    skills={this.state.resumeObject.skills}
                    publicView={this.state.publicView}
                    onUpdate={this.saveResume}
                />
            </div>
        );
    }

}