import React from 'react';
import InlineForm from "./InlineForm";

export default class EducationSection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            education: this.props.education || []
        };

        this.template = [
            { name: 'School', key: 'school', type: 'string' },
            { name: 'Degree', key: 'degree', type: 'string' },
            { name: 'Major', key: 'major', type: 'string' },
            { name: 'Period', key: 'period', type: 'timerange' },
            { name: 'Summary', key: 'summary', type: 'multiline' },
            { name: 'Bullets', key: 'bullets', type: 'bullets' }
        ];

        this.addEducation = this.addEducation.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    addEducation() {
        let updatedEducation = this.state.education.slice();
        updatedEducation.push(this.template.slice());       // TODO: maybe add some random values here for the user to start with

        this.setState({ education: updatedEducation });
    }

    onSave(updatedFields) {
        this.props.onUpdate(updatedFields);
    }

    render() {
        const addEducationButton = (
            <div className="add-section">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.addEducation}
                >Add Education</button>
            </div>
        );

        if (!this.state.education) {
            return addEducationButton;
        }

        const educations = this.state.education.map((section, index) => {
            const formFields = this.template.map((templateField) => {
                let field = Object.assign({}, templateField);
                if (section.hasOwnProperty(field.key))
                    field.value = section[field.key];
                return field;
            });

            return <InlineForm
                formFields={formFields}
                key={index}
                onSave={this.onSave}
            />
        });

        return (
            <div className="education-section">
                <h4 className="section-title">Education</h4>
                {educations}
                {addEducationButton}
            </div>
        );
    }

}