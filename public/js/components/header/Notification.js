import React from 'react';

import ResumeService from './../../ResumeService';

export default class Notification extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            message: null
        };

        this.resumeServiceSubscriptions = {
            'resume-saved': 'Resume saved successfully',
            'resume-saved-locally': 'Resume is saved locally and is private. To make this public, please login.',
            'resume-saved-error': 'Failed to save resume'   // TODO: make sure this is displayed as an error too!
        };

        this.closeNotification = this.closeNotification.bind(this);
    }

    displayMessage(message) {
        this.setState({ message: message });
        // TODO: maybe we should kill this timer on `componentWillUnmount()` just to be perfect
        setTimeout(() => {
            this.setState({ message: null });
        }, 4000);
    }

    closeNotification() {
        this.setState({ message: null });
    }

    componentDidMount() {
        Object.keys(this.resumeServiceSubscriptions).forEach((event) => {
            // TODO: maybe we can make this more generic, by receiving the service as a parameter as well
            ResumeService.on(event, () => {
                this.displayMessage(this.resumeServiceSubscriptions[event]);
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
            <div className="notification-wrapper container">
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.closeNotification}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    {this.state.message}
                </div>
            </div>
        );
    }

}