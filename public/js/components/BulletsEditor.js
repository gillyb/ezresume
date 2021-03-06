import React from 'react';
import _ from 'lodash';

export default class BulletsEditor extends React.Component {

    constructor(props) {
        super(props);

        this.updatingLink = false;
        this.updatingNewLink = false;

        this.handleChange = this.handleChange.bind(this);
        this.addNewBullet = this.addNewBullet.bind(this);
    }

    componentDidUpdate() {
        if (this.updatingNewLink) {
            // make sure the focus stays on the right input
            const lastEditedElement = this.refs['input_' + (this.props.bullets.length - 1)];
            lastEditedElement.focus();
            lastEditedElement.setSelectionRange(lastEditedElement.value.length, lastEditedElement.value.length);

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

    addNewBullet(event) {
        let updatedBullets = this.props.bullets.slice();
        updatedBullets.push(event.target.value);

        this.updatingNewLink = true;
        this.props.handleChange(updatedBullets);
    }

    handleChange(event) {
        let updatedBullets = this.props.bullets.slice();
        updatedBullets[event.target.name] = event.target.value;
        updatedBullets = _.compact(updatedBullets);

        this.updatingLink = true;
        this.props.handleChange(updatedBullets);
    }

    render() {

        const bulletInputs = this.props.bullets.map((bullet, index) =>
            <div className="form-group" key={index}>
                <input type="text" className="form-control form-control-sm" ref={'input_' + index} name={index} value={bullet} onChange={this.handleChange} />
            </div>
        );

        return (
            <div className="bullets">
                <label className="form-label">Bullets</label>
                {bulletInputs}
                <input type="text" className="form-control form-control-sm" ref="new_input" value="" onChange={this.addNewBullet} />
            </div>
        );
    }

}