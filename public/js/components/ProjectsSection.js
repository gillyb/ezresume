import React from 'react';
import _ from 'lodash';

import InlineForm from "./InlineForm";
import ResumeDataGenerator from './../ResumeDataGenerator';

export default class ProjectsSection extends React.Component {

    constructor(props) {
        super(props);

        this.template = [
            { name: 'Project name', key: 'projectName', type: 'string' },
            { name: 'Role', key: 'role', type: 'string' },
            { name: 'Website', key: 'website', type: 'string' },
            { name: 'Period', key: 'period', type: 'timerange' },
            { name: 'Summary', key: 'summary', type: 'multiline' },
            { name: 'Bullets', key: 'bullets', type: 'bullets' }
        ];

        this.addProject = this.addProject.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    addProject() {
        let updatedProjects = this.props.projects.slice();

        ResumeDataGenerator.get('projects').then((sectionData) => {
            updatedProjects.push(sectionData);
            this.props.onUpdate({ projects: updatedProjects });
        });
    }

    onSave(updatedFields, arrayIndex) {
        if (this.props.publicView)
            return;

        let newProject = {};
        _.forEach(updatedFields, (field) => {
            if (field.hasOwnProperty('value'))
                newProject[field.key] = field.value;
        });

        let updatedProjects = this.props.projects.slice();
        updatedProjects[arrayIndex] = newProject;

        this.props.onUpdate({ projects: updatedProjects });
    }

    onDelete(arrayIndex) {
        if (this.props.publicView)
            return;

        this.props.onDelete('projects', arrayIndex);
    }

    render() {
        const addProjectButton = !this.props.publicView ? (
            <div className="add-section">
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={this.addProject}
                >
                    Add Project
                    <svg fill="#868e96" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                    </svg>
                </button>
            </div>
        ) : <div className="hidden empty" />;

        if (!this.props.projects || !this.props.projects.length) {
            return (
                <div className="resume-section projects">
                    {addProjectButton}
                </div>
            );
        }

        const projects = this.props.projects.map((section, index) => {
            const formFields = this.template.map((templateField) => {
                let field = Object.assign({}, templateField);
                if (section.hasOwnProperty(field.key))
                    field.value = section[field.key];
                return field;
            });

            return <InlineForm
                formFields={formFields}
                key={index}
                arrayIndex={index}
                onSave={this.onSave}
                onDelete={this.onDelete}
                publicView={this.props.publicView}
            />
        });

        return (
            <div className="resume-section projects">
                <h4 className="section-title">Projects</h4>
                {projects}
                {addProjectButton}
            </div>
        );
    }

}