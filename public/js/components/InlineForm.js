import React from 'react';
import _ from 'lodash';
import reqwest from 'reqwest';

import TimeRangeEditor from './TimeRangeEditor';
import BulletsEditor from './BulletsEditor';
import DisplayTimeRange from './DisplayTimeRange';
import SocialMediaLink from './SocialMediaLink';
import LinksEditor from './LinksEditor';
import DropZone from 'react-dropzone';

export default class InlineForm extends React.Component {

    // TODO: extract some components from this

    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            fields: this.props.formFields
        };

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.startEditing = this.startEditing.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBulletsChange = this.handleBulletsChange.bind(this);
        this.handleLinksChange = this.handleLinksChange.bind(this);
        this.updateTimeRange = this.updateTimeRange.bind(this);
        this.handleImageDrop = this.handleImageDrop.bind(this);
    }

    handleUpdate() {
        if (this.props.publicView)
            return;

        this.props.onSave(this.state.fields, this.props.arrayIndex);
        this.setState({ editing: false });
    }

    handleDelete() {
        if (this.props.publicView)
            return;

        this.props.onDelete(this.props.arrayIndex);
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

    handleChange(event) {
        let updatedFields = [...this.state.fields];
        updatedFields.forEach((field) => {
            if (field.key === event.target.name)
                field.value = event.target.value;
        });
        this.setState({ fields: updatedFields });
    }

    handleBulletsChange(updatedValue) {
        let updatedFields = [...this.state.fields];
        _.find(updatedFields, (field) => field.type === 'bullets').value = updatedValue;
        this.setState({ fields: updatedFields });
    }

    handleLinksChange(updatedValue) {
        let updatedFields = [...this.state.fields];
        _.find(updatedFields, (field) => field.type === 'links').value = updatedValue;
        this.setState({ fields: updatedFields });
    }

    updateTimeRange(timerangeField, newState) {
        if (this.props.publicView)
            return;

        let updatedFields = [...this.state.fields];
        let updatedTimeRange = _.find(updatedFields, (field) => field.key === 'period');
        if (!updatedTimeRange.value)
            updatedTimeRange.value = {
                startDate: { day: 0, month: 0, year: 0 },
                endDate: { day: 0, month: 0, year: 0 }
            };
        updatedTimeRange.value[timerangeField] = newState;
        this.setState({ fields: updatedFields });
    }

    // TODO: export this to custom control
    handleImageDrop(acceptedFiles) {
        // TODO: maybe we shouldn't allow unregistered users to upload images
        if (!acceptedFiles || !acceptedFiles.length)
            return;

        let formData = new FormData();
        formData.append('headshot', acceptedFiles[0]);

        reqwest({
          url: '/resume/upload-image',
          method: 'POST',
          data: formData,
          processData: false,
          success: (response) => {
            let updatedFields = [...this.state.fields];
            updatedFields.forEach((field) => {
                if (field.key === 'headshot')
                    field.value = response.filename;
            });
            this.setState({ fields: updatedFields });
          },
          error: () => {

          }
        });
    }

    render() {
        let fieldValues = [];

        if (this.state.editing && !this.props.publicView) {
            this.state.fields.forEach((fieldInfo) => {

                switch (fieldInfo.type) {
                    case 'string':
                        fieldValues.push(
                            <div className={'form-group ' + fieldInfo.key} key={fieldInfo.key}>
                                <input
                                    type="text"
                                    className={'form-control form-control-sm ' + fieldInfo.key}
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
                            <div className={'form-group ' + fieldInfo.key} key={fieldInfo.key}>
                                <textarea
                                    className={'form-control form-control-sm ' + fieldInfo.key}
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
                                bullets={fieldInfo.value || []}
                                handleChange={this.handleBulletsChange}
                            />
                        );
                        break;
                    case 'links':
                        fieldValues.push(
                            <LinksEditor
                                key={fieldInfo.key}
                                links={fieldInfo.value || []}
                                handleChange={this.handleLinksChange}
                            />
                        );
                        break;
                    case 'image':
                        fieldValues.push(
                          // TODO: display current image in the background
                            <DropZone
                                className={"headshot-dropzone" + (fieldInfo.value ? " with-image" : "")}
                                key={fieldInfo.key}
                                onDrop={this.handleImageDrop}
                                // accept={'image/jpeg; image/png; image/gif'}
                                // multiple={false}
                                // maxSize={3000000}
                            >
                                <div className="image-preview" style={{backgroundImage: `url("${fieldInfo.value}")`}}></div>
                                <div className="dropzone-overlay">
                                    <i className="fa fa-camera"></i>
                                    <div className="">Drop image here</div>
                                </div>
                                <input type="hidden" name="resumeId" value={this.props.resumeId} />
                            </DropZone>
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
                                <ul className="links online-presence" key={fieldInfo.key}>
                                    {fieldInfo.value.map((link, index) =>
                                        <li key={index}>
                                            <SocialMediaLink link={link} />
                                        </li>
                                    )}
                                </ul>
                            );
                            break;
                        case 'image':
                            fieldValues.push(
                              <div className="headshot" key={fieldInfo.key}
                                style={{
                                    backgroundImage: `url("${fieldInfo.value}")`,
                                    backgroundSize: 'cover'
                                }}>
                              </div>
                            );
                            break;
                    }
                }
            });
        }

        const formClass = 'inline-form ' + this.props.sectionName + (this.state.editing ? ' edit-mode' : '');

        return (
            <div className={formClass} onClick={this.startEditing}>
                {fieldValues}

                {!this.state.editing || this.props.publicView ? '' :
                    <div className="actions">
                        <button type="button" className="btn btn-primary btn-sm" onClick={this.handleUpdate}>Save</button>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={this.handleCancel}>Cancel</button>
                        {
                            this.handleDelete ?
                                <button type="button" className="btn btn-danger btn-sm float-right" onClick={this.handleDelete}>Delete Section</button> :
                                null
                        }
                    </div>
                }

                <span className="form-action edit">Click to edit</span>
            </div>
        );
    }

}