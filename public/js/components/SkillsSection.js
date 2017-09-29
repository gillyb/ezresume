import React from 'react';
import InlineForm from "./InlineForm";

export default class SkillsSection extends React.Component {

    constructor(props) {
        super(props);

        this.template = [
            { name: 'Skills', key: 'skills', type: 'bullets' }
        ];

        this.addSkills = this.addSkills.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    addSkills() {
        this.props.onUpdate({ skills: ['List', 'Your', 'Skills'] });
    }

    onSave(updatedFields) {
        if (this.props.publicView)
            return;

        this.props.onUpdate({ skills: updatedFields[0].value });
    }

    onDelete() {
        if (this.props.publicView)
            return;

        this.props.onDelete('skills');
    }

    render() {
        const addSkillsButton = !this.props.publicView ? (
            <div className="add-section">
                {/* TODO: extract this button to something common */}
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={this.addSkills}
                >
                    Add Skills
                    <svg fill="#868e96" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                    </svg>
                </button>
            </div>
        ) : <div className="hidden empty" />;

        if (!this.props.skills || !this.props.skills.length || !this.props.skills[0]) {
            return addSkillsButton;
        }

        let formFields = this.template.slice();
        formFields[0].value = this.props.skills;

        return (
            <div className="resume-section skills">
                <h4 className="section-title">Skills</h4>
                <InlineForm
                    formFields={formFields}
                    onSave={this.onSave}
                    onDelete={this.onDelete}
                    publicView={this.props.publicView}
                />
            </div>
        );
    }

}