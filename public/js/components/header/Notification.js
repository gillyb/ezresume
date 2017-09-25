import React from 'react';

import ResumeService from './../../ResumeService';

export default class Notification extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            message: null
        };

        this.resumeServiceSubscriptions = {
            'resume': 'saving resume'
        };
    }

    displayMessage(message) {
        this.setState({ message: message });
        // setTimeout(() => {
        //     this.setState({ message: null });
        // }, 4000);
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
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    {this.state.message}
                </div>
            </div>
        );
    }

}