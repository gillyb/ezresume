import * as React from 'react';

export default class AddSection extends React.Component {

    render() {
        return (
            <div className="add-section">
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={this.props.onClick}
                >
                    {this.props.caption}
                </button>
            </div>
        );
    }

}