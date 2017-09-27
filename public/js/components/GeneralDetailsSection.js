import React from 'react';
import _ from 'lodash';

import InlineForm from "./InlineForm";

export default class GeneralDetailsSection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fields: this.props.formFields
        };

        this.template = [
            { name: 'Job title', key: 'jobTitle', type: 'string' },
            { name: 'About You', key: 'aboutYou', type: 'multiline' }
        ];

        this.onSave = this.onSave.bind(this);
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

    render() {

        const displayFields = this.template.map((field) => {
            if (this.state.fields.hasOwnProperty(field.key))
                field.value = this.state.fields[field.key];
            return field;
        });

        return (
            <div className="resume-section general-details">
                <InlineForm
                    formFields={displayFields}
                    onSave={this.onSave}
                    publicView={this.props.publicView}
                />
            </div>
        );
    }

}