import React from 'react';
import _ from 'lodash';

import InlineForm from './InlineForm';
import ResumeDataGenerator from './../ResumeDataGenerator';

export default class GeneralDetailsSection extends React.Component {

    constructor(props) {
        super(props);

        this.template = [
            { name: 'Job title', key: 'jobTitle', type: 'string' },
            { name: 'About You', key: 'aboutYou', type: 'multiline' }
        ];

        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.addGeneralDetails = this.addGeneralDetails.bind(this);
    }

    addGeneralDetails() {
        ResumeDataGenerator.get('generalDetails').then((sectionData) => {
            this.props.onUpdate({ generalDetails: sectionData });
        });
    }

    onSave(updatedFields) {
        if (this.props.publicView)
            return;

        const newGeneralDetails = {};
        _.forEach(this.template, (field) => {
            let updatedValue = _.find(updatedFields, (updatedField) => updatedField.key === field.key).value;
            newGeneralDetails[field.key] = updatedValue;
        });

        this.props.onUpdate({ generalDetails: newGeneralDetails });
    }

    onDelete() {
        if (this.props.publicView)
            return;

        this.props.onDelete('generalDetails');
    }

    render() {

        const addGeneralDetailsButton = !this.props.publicView ? (
            <div className="add-section">
                {/* TODO: extract this button to something common */}
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={this.addGeneralDetails}
                >
                    Add General Details
                    <svg fill="#868e96" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                    </svg>
                </button>
            </div>
        ) : <div className="hidden empty" />;

        if (!this.props.generalDetails) {
            return (
                <div className="resume-section general-details">
                    {addGeneralDetailsButton}
                </div>
            );
        }

        const displayFields = this.template.map((field) => {
            if (this.props.generalDetails.hasOwnProperty(field.key))
                field.value = this.props.generalDetails[field.key];
            return field;
        });

        return (
            <div className="resume-section general-details">
                <InlineForm
                    sectionName="general-details"
                    formFields={displayFields}
                    onSave={this.onSave}
                    onDelete={this.onDelete}
                    publicView={this.props.publicView}
                />
            </div>
        );
    }

}