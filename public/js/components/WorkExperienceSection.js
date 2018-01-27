import React from 'react';
import _ from 'lodash';

import InlineForm from "./InlineForm";
import ResumeDataGenerator from './../ResumeDataGenerator';
import AddSection from './AddSection';

export default class WorkExperienceSection extends React.Component {

    constructor(props) {
        super(props);

        this.template = [
            { name: 'Company name', key: 'companyName', type: 'string' },
            { name: 'Company website', key: 'companyWebsite', type: 'string' },
            { name: 'Job title', key: 'jobTitle', type: 'string' },
            { name: 'Period', key: 'period', type: 'timerange' },
            { name: 'Summary', key: 'summary', type: 'multiline' },
            { name: 'Bullets', key: 'bullets', type: 'bullets' }
        ];

        this.state = {
            editing: false
        };

        this.addWorkExperience = this.addWorkExperience.bind(this);
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

    addWorkExperience() {
        let updatedWorkExperience = this.props.workExperience.slice();

        ResumeDataGenerator.get('workExperience').then((sectionData) => {
            updatedWorkExperience.push(sectionData);
            this.props.onUpdate({ workExperience: updatedWorkExperience });
        });
    }

    onSave(updatedFields, arrayIndex) {
        if (this.props.publicView)
            return;

        let newWorkExperience = {};
        _.forEach(updatedFields, (field) => {
            if (field.hasOwnProperty('value'))
                newWorkExperience[field.key] = field.value;
        });

        let updatedWorkExperiences = this.props.workExperience.slice();
        updatedWorkExperiences[arrayIndex] = newWorkExperience;

        this.props.onUpdate({ workExperience: updatedWorkExperiences });
    }

    onDelete(arrayIndex) {
        if (this.props.publicView)
            return;

        this.props.onDelete('workExperience', arrayIndex);
    }

    render() {
        const addWorkExperienceButton = !this.props.publicView ?
            <AddSection caption="Add work experience" onClick={this.addWorkExperience} /> : <div className="hidden empty" />;

        if (!this.props.workExperience || !this.props.workExperience.length) {
            return (
                <div className="resume-section work-experience">
                    {addWorkExperienceButton}
                </div>
            );
        }

        const workExperiences = this.props.workExperience.map((section, index) => {
            const formFields = this.template.map((templateField) => {
                let field = Object.assign({}, templateField);
                if (section.hasOwnProperty(field.key))
                    field.value = section[field.key];
                return field;
            });

            return <InlineForm
                sectionName="work-experience"
                formFields={formFields}
                key={index}
                arrayIndex={index}
                onSave={this.onSave}
                onDelete={this.onDelete}
                onStartEditing={this.startEdit}
                onStopEditing={this.stopEdit}
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