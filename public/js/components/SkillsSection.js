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
    }

    addSkills() {
        this.props.onUpdate({ skills: ['List', 'Your', 'Skills'] });
    }

    onSave(updatedFields) {
        if (this.props.publicView)
            return;

        this.props.onUpdate({ skills: updatedFields[0].value });
    }

    render() {
        const addSkillsButton = !this.props.publicView ? (
            <div className="add-section">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.addSkills}
                >Add Skills</button>
            </div>
        ) : <div className="hidden empty" />;

        if (!this.props.skills || !this.props.skills.length) {
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
                    publicView={this.props.publicView}
                />
            </div>
        );
    }

}