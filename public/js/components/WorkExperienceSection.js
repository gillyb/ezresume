import React from 'react';
import InlineForm from "./InlineForm";

export default class WorkExperienceSection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            workExperience: this.props.workExperience || []
        };

        this.template = [
            { name: 'Company name', key: 'companyName', type: 'string' },
            { name: 'Company website', key: 'companyWebsite', type: 'string' },
            { name: 'Job title', key: 'jobTitle', type: 'string' },
            { name: 'Period', key: 'period', type: 'timerange' },
            { name: 'Summary', key: 'summary', type: 'multiline' },
            { name: 'Bullets', key: 'bullets', type: 'bullets' }
        ];

        this.addWorkExperience = this.addWorkExperience.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    addWorkExperience() {
        let updatedWorkExperience = this.state.workExperience.slice();
        updatedWorkExperience.push(this.template.slice());       // TODO: maybe add some random values here for the user to start with

        this.setState({ workExperience: updatedWorkExperience });
    }

    onSave(updatedFields) {
        if (this.props.publicView)
            return;

        this.props.onUpdate(updatedFields);
    }

    render() {
        const addWorkExperienceButton = !this.props.publicView ? (
            <div className="add-section">
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={this.addWorkExperience}
                >
                    Add Work Experience
                    <svg fill="#868e96" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                    </svg>
                </button>
            </div>
        ) : <div className="hidden empty" />;

        if (!this.state.workExperience || !this.state.workExperience.length) {
            return addWorkExperienceButton;
        }

        const workExperiences = this.state.workExperience.map((section, index) => {
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
                publicView={this.props.publicView}
            />
        });

        return (
            <div className="resume-section work-experience">
                <h4 className="section-title">Work Experience</h4>
                {workExperiences}
                {addWorkExperienceButton}
            </div>
        );
    }

}