import React from 'react';
import _ from 'lodash';

export default class LinksEditor extends React.Component {

    constructor(props) {
        super(props);

        this.updatingLink = false;
        this.updatingNewLink = false;

        this.handleChange = this.handleChange.bind(this);
        this.addNewLink = this.addNewLink.bind(this);
    }

    componentDidUpdate() {
        if (this.updatingNewLink) {
            // make sure the focus stays on the right input
            let editingInput = this.refs['input_' + (this.props.links.length - 1)];
            editingInput.focus();
            editingInput.setSelectionRange(editingInput.value.length, editingInput.value.length);

            this.updatingNewLink = false;
        }
        else if (this.updatingLink) {
            // make sure one of the input elements has focus
            let refInputIndex = -1;
            while (this.refs['input_' + (++refInputIndex)]) {
                if (this.refs['input_' + refInputIndex] === document.activeElement)
                    return;
            }

            if (refInputIndex <= 0) {
                this.refs['new_input'].focus();
                return;
            }

            this.refs['input_' + (refInputIndex - 1)].focus();

            this.updatingLink = false;
        }
    }

    addNewLink(event) {
        let updatedLinks = this.props.links.slice();
        updatedLinks.push(event.target.value);

        this.updatingNewLink = true;
        this.props.handleChange(updatedLinks);
    }

    handleChange(event) {
        let updatedLinks = this.props.links.slice();
        updatedLinks[event.target.name] = event.target.value;
        updatedLinks = _.compact(updatedLinks);

        this.updatingLink = true;
        this.props.handleChange(updatedLinks);
    }

    render() {

        const linksInput = this.props.links.map((link, index) =>
            <div className="form-group" key={index}>
                <input type="text" className="form-control form-control-sm" ref={'input_' + index} name={index} value={link} onChange={this.handleChange} />
            </div>
        );

        return (
            <div className="links">
                <label className="form-label">External links (online presence)</label>
                {linksInput}
                <input type="text" className="form-control form-control-sm" ref="new_input" value="" onChange={this.addNewLink} />
            </div>
        );
    }

}