import React from 'react';

export default class BulletsEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            bullets: this.props.bullets || []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        // TODO: finish implementation
        // this.setState({  })
    }

    render() {

        const bulletInputs = this.state.bullets.map((bullet, index) =>
            <div className="form-group" key={index}>
                <input type="text" className="form-control form-control-sm" value={bullet} />
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