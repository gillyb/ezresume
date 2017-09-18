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
            { name: 'Job title', key: 'jobTitle', type: 'string' }
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
        this.props.onUpdate(updatedFields);
    }

    render() {
        const addWorkExperienceButton = (
            <div className="add-section">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.addWorkExperience}
                >Add Work Experience</button>
            </div>
        );

        if (!this.state.workExperience) {
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
            />
        });

        return (
            <div className="work-experience-section">
                <h4 className="section-title">Work Experience</h4>
                {workExperiences}
                {addWorkExperienceButton}
            </div>
        );
    }

}