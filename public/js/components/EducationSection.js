import React from 'react';
import _ from 'lodash';

import InlineForm from "./InlineForm";
import ResumeDataGenerator from './../ResumeDataGenerator';
import AddSection from './AddSection';

export default class EducationSection extends React.Component {

    constructor(props) {
        super(props);

        this.template = [
            { name: 'School', key: 'school', type: 'string' },
            { name: 'Degree', key: 'degree', type: 'string' },
            { name: 'Major', key: 'major', type: 'string' },
            { name: 'Period', key: 'period', type: 'timerange' },
            { name: 'Summary', key: 'summary', type: 'multiline' },
            { name: 'Bullets', key: 'bullets', type: 'bullets' }
        ];

        this.state = {
            editing: false
        };

        this.addEducation = this.addEducation.bind(this);
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

    addEducation() {
        let updatedEducation = this.props.education.slice();

        ResumeDataGenerator.get('education').then((sectionData) => {
            updatedEducation.push(sectionData);
            this.props.onUpdate({ education: updatedEducation });
        });
    }

    onSave(updatedFields, arrayIndex) {
        if (this.props.publicView)
            return;

        let newEducation = {};
        _.forEach(updatedFields, (field) => {
            if (field.hasOwnProperty('value'))
                newEducation[field.key] = field.value;
        });

        let updatedEducation = this.props.education.slice();
        updatedEducation[arrayIndex] = newEducation;

        this.props.onUpdate({ education: updatedEducation });
    }

    onDelete(arrayIndex) {
        if (this.props.publicView)
            return;

        this.props.onDelete('education', arrayIndex);
    }

    render() {
        const addEducationButton = !this.props.publicView ?
            <AddSection caption="Add education" onClick={this.addEducation} /> : <div className="hidden empty" />;

        if (!this.props.education || !this.props.education.length) {
            return (
                <div className="resume-section education">
                    {addEducationButton}
                </div>
            );
        }

        const educations = this.props.education.map((section, index) => {
            const formFields = this.template.map((templateField) => {
                let field = Object.assign({}, templateField);
                if (section.hasOwnProperty(field.key))
                    field.value = section[field.key];
                return field;
            });

            return <InlineForm
                sectionName="education"
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
            <div className="resume-section education">
                <h4 className="section-title">Education</h4>
                {educations}
                {addEducationButton}
            </div>
        );
    }

}