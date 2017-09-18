import React from 'react';
import InlineForm from "./InlineForm";

export default class GeneralDetailsSection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fields: this.props.formFields
        };

        this.template = [
            { name: 'Job title', key: 'jobTitle', type: 'string' },
            { name: 'About You', key: 'aboutYou', type: 'string' }
        ];

        this.onSave = this.onSave.bind(this);
    }

    onSave(updatedFields) {
        this.props.onUpdate(updatedFields);
    }

    render() {

        const displayFields = this.template.map((field) => {
            if (this.state.fields.hasOwnProperty(field.key))
                field.value = this.state.fields[field.key];
            return field;
        });

        return (
            <InlineForm
                formFields={displayFields}
                onSave={this.onSave}
            />
        );
    }

}