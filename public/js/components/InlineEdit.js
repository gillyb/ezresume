import React from 'react';
import ReactDOM from 'react-dom';

export default class InlineEdit extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            editing: false
        };

        this.startEdit = this.startEdit.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.finishEditing = this.finishEditing.bind(this);
        this.cancelEditing = this.cancelEditing.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        let inputElem = ReactDOM.findDOMNode(this.refs.input);
        if (this.state.editing && !prevState.editing) {
            inputElem.focus();
            inputElem.setSelectionRange(0, inputElem.value.length);
        } else if (this.state.editing && prevProps.value != this.props.value) {
            this.finishEditing();
        }
    }

    startEdit() {
        this.setState({ editing: true });
    }

    keyDown(event) {
        if (event.keyCode === 13) {             // pressed 'Enter' key
            this.finishEditing();
        }
        else if (event.keyCode === 27) {        // pressed 'Esc' key
            this.cancelEditing();
        }
    }

    finishEditing() {
        this.setState({ editing: false });
        this.props.onUpdate({
            name: this.props.name,
            value: this.state.value
        });
    }

    cancelEditing() {
        this.setState({
            editing: false,
            value: this.props.value
        });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        if (this.state.editing) {
            return (
                <input
                    type="text"
                    ref="input"
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyDown={this.keyDown}
                    onBlur={this.finishEditing}
                />
            );
        }

        return (
            <span
                className="inline-edit"
                onClick={this.startEdit}
            >{this.props.value}</span>
        );
    }

}