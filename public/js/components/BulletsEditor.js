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
            <input type="text" key={index} value={bullet} />
        );

        return (
            <div className="bullets">
                {bulletInputs}
                <input type="text" value="" onChange={this.handleChange} />
            </div>
        );
    }

}