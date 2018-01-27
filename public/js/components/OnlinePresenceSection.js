import React from 'react';
import InlineForm from "./InlineForm";

import ResumeDataGenerator from './../ResumeDataGenerator';
import AddSection from './AddSection';

export default class OnlinePresenceSection extends React.Component {

    constructor(props) {
        super(props);

        this.template = [
            { name: 'Online presence (links to online public profiles)', key: 'links', type: 'links' }
        ];

        this.state = {
            editing: false
        };

        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.addOnlinePresence = this.addOnlinePresence.bind(this);
        this.startEdit = this.startEdit.bind(this);
        this.stopEdit = this.stopEdit.bind(this);
    }

    startEdit() {
        this.setState({ editing: true });
    }
    stopEdit() {
        this.setState({ editing: false });
    }

    addOnlinePresence() {
        ResumeDataGenerator.get('onlinePresence').then((sectionData) => {
            this.props.onUpdate({ onlinePresence: sectionData });
        });
    }

    onSave(updatedFields) {
        if (this.props.publicView)
            return;

        this.props.onUpdate({ onlinePresence: updatedFields });
    }

    onDelete() {
        if (this.props.publicView)
            return;

        this.props.onDelete('onlinePresence');
    }

    render() {
        const addOnlinePresenceButton = !this.props.publicView ?
            <AddSection caption="Add online presence" onClick={this.addOnlinePresence} /> : <div className="hidden empty" />;

        if (!this.props.onlinePresence || !this.props.onlinePresence.links || !this.props.onlinePresence.links[0]) {
            return (
                <div className="resume-section online-presence">
                    {addOnlinePresenceButton}
                </div>
            );
        }

        let formFields = this.template.slice();
        formFields[0].value = this.props.onlinePresence.links;

        return (
            <div className="resume-section online-presence">
                <InlineForm
                    sectionName="online-presence"
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