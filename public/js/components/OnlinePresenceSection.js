import React from 'react';
import InlineForm from "./InlineForm";

export default class OnlinePresenceSection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fields: this.props.formFields
        };

        this.template = [
            { name: 'Online presence (links to online public profiles)', key: 'links', type: 'links' }
        ];

        this.onSave = this.onSave.bind(this);
    }

    onSave(updatedFields) {
        if (this.props.publicView)
            return;

        this.props.onUpdate(updatedFields);
    }

    render() {

        // const displayFields = this.template.map((field) => {
        //     if (this.state.fields.hasOwnProperty(field.key))
        //         field.value = this.state.fields[field.key];
        //     return field;
        // });

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