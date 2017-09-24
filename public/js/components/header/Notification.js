import React from 'react';

import ResumeService from './../../ResumeService';

export default class Notification extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            message: null
        };

        this.subscriptions = {
            'resume': 'saving resume'
        };
    }

    displayMessage(message) {
        this.setState({ message: message });
        setTimeout(() => {
            this.setState({ message: null });
        }, 4000);
    }

    componentDidMount() {
        Object.keys(this.subscriptions).forEach((event) => {
            ResumeService.on(event, () => {
                this.displayMessage(this.subscriptions[event]);
            });
        });
    }

    componentWillUnmount() {
        // TODO: unsubscribe from all events we subscribed to in `componentDidMount`
        // this.authService.removeListener
    }

    render() {
        if (!this.state.message) {
            return null;
        }

        return (
            <div className="notification-wrapper">
                <div className="notification">
                    <div className="message">{this.state.message}</div>
                </div>
            </div>
        );
    }

}