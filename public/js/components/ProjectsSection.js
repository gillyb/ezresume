import React from 'react';
import InlineForm from "./InlineForm";

export default class ProjectsSection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            projects: this.props.projects || []
        };

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
    }

    addProject() {
        let updatedProjects = this.state.projects.slice();
        updatedProjects.push(this.template.slice());       // TODO: maybe add some random values here for the user to start with

        this.setState({ projects: updatedProjects });
    }

    onSave(updatedFields) {
        this.props.onUpdate(updatedFields);
    }

    render() {
        const addProjectButton = (
            <div className="add-section">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.addProject}
                >Add Project</button>
            </div>
        );

        if (!this.state.projects) {
            return addProjectButton;
        }

        const projects = this.state.projects.map((section, index) => {
            const formFields = this.template.map((templateField) => {
                let field = Object.assign({}, templateField);
                if (section.hasOwnProperty(field.key))
                    field.value = section[field.key];
                return field;
            });

            return <InlineForm
                formFields={formFields}
                key={index}
                onSave={this.onSave}
            />
        });

        return (
            <div className="projects-section">
                <h4 className="section-title">Projects</h4>
                {projects}
                {addProjectButton}
            </div>
        );
    }

}