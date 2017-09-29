import React from 'react';
import _ from 'lodash';

import InlineForm from "./InlineForm";

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

        this.addEducation = this.addEducation.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    addEducation() {
        let updatedEducation = this.props.education.slice();
        updatedEducation.push({ school: '' });       // TODO: maybe add some random values here for the user to start with

        this.props.onUpdate({ education: updatedEducation });
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
        const addEducationButton = !this.props.publicView ? (
            <div className="add-section">
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={this.addEducation}
                >
                    Add Education
                    <svg fill="#868e96" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                    </svg>
                </button>
            </div>
        ) : <div className="hidden empty" />;

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
                formFields={formFields}
                key={index}
                arrayIndex={index}
                onSave={this.onSave}
                onDelete={this.onDelete}
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