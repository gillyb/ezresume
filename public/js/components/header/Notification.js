import React from 'react';

import AuthService from './../../AuthService';

export default class Notification extends React.Component {

    constructor(props) {
        super(props);

        this.authService = new AuthService();
        this.state = {
            message: null
        };
    }

    displayMessage(message) {
        this.setState({ message: message });
        setTimeout(() => {
            this.setState({ message: null });
        }, 4000);
    }

    componentDidMount() {
        this.authService.on('logged-in', () => {
            this.displayMessage('hello world');
        });
    }

    componentWillUnmount() {
        // this.authService.removeListener
    }

    render() {
        if (!this.state.message) {
            return null;
        }

        return <div className="notification">{this.state.message}</div>;
    }

}