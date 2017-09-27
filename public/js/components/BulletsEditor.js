import React from 'react';

export default class BulletsEditor extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let updatedBullets = this.props.bullets.slice();
        updatedBullets[event.target.name] = event.target.value;

        this.props.handleChange(updatedBullets);
    }

    render() {

        const bulletInputs = this.props.bullets.map((bullet, index) =>
            <div className="form-group" key={index}>
                <input type="text" className="form-control form-control-sm" name={index} value={bullet} onChange={this.handleChange} />
            </div>
        );

        return (
            <div className="bullets">
                {bulletInputs}
                <input type="text" className="form-control form-control-sm" value="" onChange={this.handleChange} />
            </div>
        );
    }

}