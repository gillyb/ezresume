import React from 'react';
import _ from 'lodash';

import TimeRangeEditor from './TimeRangeEditor';
import BulletsEditor from './BulletsEditor';

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
        this.updateTimeRange = this.updateTimeRange.bind(this);
    }

    handleUpdate() {
        if (this.props.publicView)
            return;

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
                        break;
                    case 'multiline':
                        fieldValues.push(
                            <textarea
                                className="form-control"
                                key={fieldInfo.key}
                                name={fieldInfo.key}
                                value={fieldInfo.value}
                                placeholder={fieldInfo.name}
                                onChange={this.handleChange}
                            />
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
                                // TODO: This isn't really nice. Make this look much better!
                                <div className="timerange form-value" key={fieldInfo.key}>
                                    {fieldInfo.value.startDate.day ? <span>{fieldInfo.value.startDate.day}</span> : ''}
                                    {fieldInfo.value.startDate.month ? <span>{fieldInfo.value.startDate.month}</span> : ''}
                                    {fieldInfo.value.startDate.year ? <span>{fieldInfo.value.startDate.year}</span> : ''}
                                    <span className="separator"> - </span>
                                    {fieldInfo.value.endDate.day ? <span>{fieldInfo.value.endDate.day}</span> : ''}
                                    {fieldInfo.value.endDate.month ? <span>{fieldInfo.value.endDate.month}</span> : ''}
                                    {fieldInfo.value.endDate.year ? <span>{fieldInfo.value.endDate.year}</span> : ''}
                                </div>
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
                    }
                }
            });
        }

        return (
            <div className="inline-form form-group" onClick={this.startEditing}>
                {fieldValues}

                {!this.state.editing || this.props.publicView ? '' :
                    <div className="actions">
                        <button type="button" className="btn btn-primary btn-sm" onClick={this.handleUpdate}>Save</button>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={this.handleCancel}>Cancel</button>
                    </div>
                }
            </div>
        );
    }

}