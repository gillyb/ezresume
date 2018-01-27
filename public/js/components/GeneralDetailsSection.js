import React from 'react';
import _ from 'lodash';

import InlineForm from './InlineForm';

export default class GeneralDetailsSection extends React.Component {

    // TODO: maybe we should make a custom editor for this, instead of using InlineForm

    constructor(props) {
        super(props);

        this.template = [
            { type: 'open-div', value: '1' },
            { name: 'Headshot', key: 'headshot', type: 'image' },
            { name: 'Full Name', key: 'fullName', type: 'string' },
            { name: 'Job title', key: 'jobTitle', type: 'string' },
            { name: 'About You', key: 'aboutYou', type: 'multiline' },
            { type: 'close-div', class: 'clearfix', value: '1' },
            { name: 'Online Presence', key: 'onlinePresence', type: 'links' }
        ];
        this.state = {
            editing: false
        };

        this.onSave = this.onSave.bind(this);
        this.startEdit = this.startEdit.bind(this);
        this.stopEdit = this.stopEdit.bind(this);
    }

    startEdit() {
        this.setState({ editing: true });
    }
    stopEdit() {
        this.setState({ editing: false });
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
        this.setState({ editing: false });
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
                    onStartEditing={this.startEdit}
                    onStopEditing={this.stopEdit}
                    onSave={this.onSave}
                    publicView={this.props.publicView}
                    resumeId={this.props.resumeId}
                />
            </div>
        );
    }

}