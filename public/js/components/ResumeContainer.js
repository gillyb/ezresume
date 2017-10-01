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

        // TODO: public should only work with slug in the end
        const publicView = window.location.search.indexOf('public') !== -1;

        // TODO: check if we should separate the resumeObject to parts for a performance improvement
        this.state = {
            resumeObject: this.props.resumeObject,
            publicView: publicView
        };

        this.saveSection = this.saveSection.bind(this);
        this.deleteSection = this.deleteSection.bind(this);
    }

    saveResume(resumeObject) {
        ResumeService.save(resumeObject);
        this.setState({ resumeObject: resumeObject });
    }

    saveSection(newFields) {
        if (this.state.publicView)
            return;

        const updatedResumeObject = _.assign(this.state.resumeObject, newFields);
        this.saveResume(updatedResumeObject);
    }

    deleteSection(sectionName, arrayIndex) {
        if (this.state.publicView)
            return;

        if (!window.confirm('Are you sure you want to delete this section?'))
            return;

        if (arrayIndex === undefined) {
            let updatedResumeObject = _.cloneDeep(this.state.resumeObject);
            delete updatedResumeObject[sectionName];

            this.saveResume(updatedResumeObject);
            return;
        }

        let updatedResumeObject = _.cloneDeep(this.state.resumeObject);
        updatedResumeObject[sectionName].splice(arrayIndex, 1);

        this.saveResume(updatedResumeObject);
    }

    render() {

        const containerClassName = (this.state.publicView ? 'public-view ' : 'edit-mode ') + 'resume-container';

        return (
            <div className={containerClassName}>
                <h1 className="full-name">{this.state.resumeObject.fullName}</h1>
                <GeneralDetailsSection
                    formFields={this.state.resumeObject.generalDetails}
                    publicView={this.state.publicView}
                    onUpdate={this.saveSection}
                    onDelete={this.deleteSection}
                />
                <WorkExperienceSection
                    workExperience={this.state.resumeObject.workExperience || []}
                    publicView={this.state.publicView}
                    onUpdate={this.saveSection}
                    onDelete={this.deleteSection}
                />
                <EducationSection
                    education={this.state.resumeObject.education || []}
                    publicView={this.state.publicView}
                    onUpdate={this.saveSection}
                    onDelete={this.deleteSection}
                />
                <ProjectsSection
                    projects={this.state.resumeObject.projects || []}
                    publicView={this.state.publicView}
                    onUpdate={this.saveSection}
                    onDelete={this.deleteSection}
                />
                <SkillsSection
                    skills={this.state.resumeObject.skills}
                    publicView={this.state.publicView}
                    onUpdate={this.saveSection}
                    onDelete={this.deleteSection}
                />
            </div>
        );
    }

}