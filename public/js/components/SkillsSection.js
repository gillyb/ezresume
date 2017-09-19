import React from 'react';
import InlineForm from "./InlineForm";

export default class SkillsSection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            skills: this.props.skills || []
        };

        this.template = [
            { name: 'Skills', key: 'skills', type: 'bullets' }
        ];

        this.addSkills = this.addSkills.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    addSkills() {
        this.setState({ skills: this.template.slice() });
    }

    onSave(updatedFields) {
        this.props.onUpdate(updatedFields);
    }

    render() {
        const addSkillsButton = (
            <div className="add-section">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.addSkills}
                >Add Skills</button>
            </div>
        );

        if (!this.state.skills) {
            return addSkillsButton;
        }

        let formFields = this.template.slice();
        formFields[0].value = this.state.skills;

        return (
            <div className="skills-section">
                <h4 className="section-title">Skills</h4>
                <InlineForm
                    formFields={formFields}
                    onSave={this.onSave}
                />
            </div>
        );
    }

}