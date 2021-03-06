import React from 'react';

import GeneralDetailsSection from './GeneralDetailsSection';
import WorkExperienceSection from './WorkExperienceSection';
import EducationSection from "./EducationSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";

import ResumeService from './../ResumeService';
import IsPublic from './../IsPublic';
import ResumeActions from './ResumeActions';

export default class ResumeContainer extends React.Component {

    constructor(props) {
        super(props);

        const publicView = IsPublic();

        // TODO: check if we should separate the resumeObject to parts for a performance improvement
        this.state = {
            editing: false,
            resumeObject: this.props.resumeObject,
            publicView: publicView
        };

        this.saveSection = this.saveSection.bind(this);
        this.deleteSection = this.deleteSection.bind(this);
    }

    saveResume(resumeObject) {
        // TODO: check if we can optimize this and not call `setState()` twice
        this.setState({ resumeObject: resumeObject });
        ResumeService.save(resumeObject).then((newResumeId) => {
            if (newResumeId) {
                const updatedResume = {...this.state.resumeObject};
                updatedResume._id = newResumeId;
                this.setState({
                  resumeObject: updatedResume,
                  editing: false
                });
            }
        });
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

        const containerClassName = (this.state.publicView ? 'public-view ' : 'edit-mode ') + 'resume-container theme-default';

        return (
            <div className={containerClassName} id="resume-container default-theme">
                {!this.state.publicView ? <ResumeActions /> : null}
                <GeneralDetailsSection
                    generalDetails={this.state.resumeObject.generalDetails}
                    publicView={this.state.publicView}
                    onUpdate={this.saveSection}
                    onDelete={this.deleteSection}
                    resumeId={this.state.resumeObject._id}
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