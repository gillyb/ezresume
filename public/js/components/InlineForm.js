import React from 'react';

export default class InlineForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            fields: this.props.formFields
        };

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.startEditing = this.startEditing.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleUpdate() {
        this.props.onSave(this.state.fields);
        this.setState({ editing: false });
    }

    handleCancel() {
        this.setState({
            fields: this.props.formFields,
            editing: false
        });
    }

    startEditing() {
        if (!this.state.editing)
            this.setState({ editing: true });
    }

    // TODO: use a better utility for this
    cloneArray(arr) {
        return JSON.parse(JSON.stringify(arr));
    }

    handleChange(event) {
        let updatedFields = this.cloneArray(this.state.fields);
        updatedFields.forEach((field) => {
            if (field.key === event.target.name)
                field.value = event.target.value;
        });
        this.setState({ fields: updatedFields });
    }

    render() {
        let fieldValues = [];

        if (this.state.editing) {
            this.state.fields.forEach((fieldInfo) => {
                fieldValues.push(
                    <input
                        type="text"
                        className="form-control"
                        key={fieldInfo.key}
                        name={fieldInfo.key}
                        value={fieldInfo.value}
                        placeholder={fieldInfo.name}
                        onChange={this.handleChange}
                    />
                );
            });
        }
        else {
            this.state.fields.forEach((fieldInfo) => {
                if (fieldInfo.value)
                    fieldValues.push(
                        <div
                            className="form-value"
                            key={fieldInfo.key}
                        >{fieldInfo.value}</div>
                    );
            });
        }

        return (
            <div className="inline-form form-group" onClick={this.startEditing}>
                {fieldValues}

                {!this.state.editing ? '' :
                    <div className="actions">
                        <button type="button" className="btn btn-primary btn-sm" onClick={this.handleUpdate}>Save</button>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={this.handleCancel}>Cancel</button>
                    </div>
                }
            </div>
        );
    }

}