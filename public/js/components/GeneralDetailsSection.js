import React from 'react';
import _ from 'lodash';

import InlineForm from './InlineForm';

export default class GeneralDetailsSection extends React.Component {

    // TODO: maybe we should make a custom editor for this, instead of using InlineForm

    constructor(props) {
        super(props);

        this.template = [
            { name: 'Headshot', key: 'headshot', type: 'image' },
            { name: 'Full Name', key: 'fullName', type: 'string' },
            { name: 'Job title', key: 'jobTitle', type: 'string' },
            { name: 'About You', key: 'aboutYou', type: 'multiline' },
            { name: 'Online Presence', key: 'onlinePresence', type: 'links' }
        ];

        this.onSave = this.onSave.bind(this);
    }

    onSave(updatedFields) {
        // TODO: validate that at least a fullname exists!
        if (this.props.publicView)
            return;

        const newGeneralDetails = {};
        _.forEach(this.template, (field) => {
            let updatedValue = _.find(updatedFields, (updatedField) => updatedField.key === field.key).value;
            newGeneralDetails[field.key] = updatedValue;
        });

        this.props.onUpdate({ generalDetails: newGeneralDetails });
    }

    render() {

        // TODO: this can't be empty!! (validate it)

        const displayFields = this.template.map((field) => {
            if (this.props.generalDetails.hasOwnProperty(field.key))
                field.value = this.props.generalDetails[field.key];
            return field;
        });

        const hasHeadshot = !!this.props.generalDetails['headshot'];

        return (
            <div className={"clearfix resume-section general-details" + (hasHeadshot ? " with-headshot" : "")}>
                <InlineForm
                    sectionName="general-details"
                    formFields={displayFields}
                    onSave={this.onSave}
                    publicView={this.props.publicView}
                    resumeId={this.props.resumeId}
                />
            </div>
        );
    }

}