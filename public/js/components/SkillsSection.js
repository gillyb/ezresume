import React from 'react';

import InlineForm from "./InlineForm";
import ResumeDataGenerator from './../ResumeDataGenerator';
import AddSection from './AddSection';

export default class SkillsSection extends React.Component {

    constructor(props) {
        super(props);

        this.template = [
            { name: 'Skills', key: 'skills', type: 'bullets' }
        ];

        this.state = {
            editing: false
        };

        this.addSkills = this.addSkills.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.startEdit = this.startEdit.bind(this);
        this.stopEdit = this.stopEdit.bind(this);
    }

    startEdit() {
        this.setState({ editing: true });
    }
    stopEdit() {
        this.setState({ editing: false });
    }

    addSkills() {
        ResumeDataGenerator.get('skills').then((sectionData) => {
            this.props.onUpdate({ skills: sectionData });
        });
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
        const addSkillsButton = !this.props.publicView ?
            <AddSection caption="Add skills" onClick={this.addSkills} /> : <div className="hidden empty" />;

        if (!this.props.skills || !this.props.skills.length) {
            return (
                <div className="resume-section skills">
                    {addSkillsButton}
                </div>
            );
        }

        let formFields = this.template.slice();
        formFields[0].value = this.props.skills;

        return (
            <div className="resume-section skills">
                <h4 className="section-title">Skills</h4>
                <InlineForm
                    sectionName="skills"
                    formFields={formFields}
                    onSave={this.onSave}
                    onDelete={this.onDelete}
                    onStartEditing={this.startEdit}
                    onStopEditing={this.stopEdit}
                    publicView={this.props.publicView}
                />
            </div>
        );
    }

}