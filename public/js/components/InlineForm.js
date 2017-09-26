import React from 'react';
import _ from 'lodash';

import TimeRangeEditor from './TimeRangeEditor';
import BulletsEditor from './BulletsEditor';
import DisplayTimeRange from './DisplayTimeRange';

export default class InlineForm extends React.Component {

    // TODO: extract some components from this

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
        this.updateTimeRange = this.updateTimeRange.bind(this);
    }

    handleUpdate() {
        if (this.props.publicView)
            return;

        this.props.onSave(this.state.fields, this.props.arrayIndex);
        this.setState({ editing: false });
    }

    handleCancel() {
        this.setState({
            fields: this.props.formFields,
            editing: false
        });
    }

    startEditing() {
        if (this.props.publicView)
            return;

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

    updateTimeRange(timerangeField, newState) {
        if (this.props.publicView)
            return;

        let updatedFields = this.cloneArray(this.state.fields);
        let updatedTimeRange = _.find(updatedFields, (field) => field.key === 'period');
        if (!updatedTimeRange.value)
            updatedTimeRange.value = {
                startDate: { day: 0, month: 0, year: 0 },
                endDate: { day: 0, month: 0, year: 0 }
            };
        updatedTimeRange.value[timerangeField] = newState;
        this.setState({ fields: updatedFields });
    }

    render() {
        let fieldValues = [];

        if (this.state.editing && !this.props.publicView) {
            this.state.fields.forEach((fieldInfo) => {

                switch (fieldInfo.type) {
                    case 'string':
                        fieldValues.push(
                            <div className="form-group" key={fieldInfo.key}>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    name={fieldInfo.key}
                                    value={fieldInfo.value}
                                    placeholder={fieldInfo.name}
                                    onChange={this.handleChange}
                                />
                            </div>
                        );
                        break;
                    case 'multiline':
                        fieldValues.push(
                            <div className="form-group" key={fieldInfo.key}>
                                <textarea
                                    className="form-control form-control-sm"
                                    name={fieldInfo.key}
                                    value={fieldInfo.value}
                                    placeholder={fieldInfo.name}
                                    onChange={this.handleChange}
                                />
                            </div>
                        );
                        break;
                    case 'timerange':
                        fieldValues.push(
                            <TimeRangeEditor
                                key={fieldInfo.key}
                                startDate={fieldInfo.value ? fieldInfo.value.startDate : undefined}
                                endDate={fieldInfo.value ? fieldInfo.value.endDate : undefined}
                                onUpdate={this.updateTimeRange}
                            />
                        );
                        break;
                    case 'bullets':
                        fieldValues.push(
                            <BulletsEditor
                                key={fieldInfo.key}
                                bullets={fieldInfo.value}
                            />
                        );
                        break;
                    case 'links':
                        fieldValues.push(
                            <LinksEditor
                                key={fieldInfo.key}
                                links={fieldInfo.values}
                            />
                        );
                        break;
                }
            });
        }
        else {
            this.state.fields.forEach((fieldInfo) => {
                if (fieldInfo.value) {

                    switch (fieldInfo.type) {

                        case 'string':
                        case 'multiline':
                            fieldValues.push(
                                <div
                                    className={fieldInfo.key + ' form-value'}
                                    key={fieldInfo.key}
                                >
                                    {fieldInfo.value.split('\n').map((line, index) => <span key={index}>{line}<br/></span>)}
                                </div>
                            );
                            break;

                        case 'timerange':
                            fieldValues.push(
                                <DisplayTimeRange
                                    key={fieldInfo.key}
                                    startDate={fieldInfo.value.startDate}
                                    endDate={fieldInfo.value.endDate}
                                />
                            );
                            break;

                        case 'bullets':
                            fieldValues.push(
                                <ul className="bullets" key={fieldInfo.key}>
                                    {fieldInfo.value.map((bullet, index) =>
                                        <li key={index}>{bullet}</li>
                                    )}
                                </ul>
                            );
                            break;
                        case 'links':
                            fieldValues.push(
                                <ul className="links" key={fieldInfo.key}>
                                    {fieldInfo.value.map((link, index) =>
                                        <li key={index}>{link}</li>
                                    )}
                                </ul>
                            );
                            break;
                    }
                }
            });
        }

        const formClass = 'inline-form' + (this.state.editing ? ' edit-mode' : '');

        return (
            <div className={formClass} onClick={this.startEditing}>
                {fieldValues}

                {!this.state.editing || this.props.publicView ? '' :
                    <div className="actions">
                        <button type="button" className="btn btn-primary btn-sm" onClick={this.handleUpdate}>Save</button>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={this.handleCancel}>Cancel</button>
                    </div>
                }

                <span className="click-to-edit">Click to edit</span>
            </div>
        );
    }

}