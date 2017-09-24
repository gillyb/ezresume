import React from 'react';
import { observable, autorun } from 'mobx';

import AuthService from './../../AuthService';

export default class Notification extends React.Component {

    constructor(props) {
        super(props);

        // this.state = observable({
        //     hello: false
        // });

        this.disposer = null;
        this.auth = new AuthService();
    }

    componentWillUnmount() {
        this.disposer();
    }

    render() {
        this.disposer = autorun(() => {
            console.log('logged in : ' + JSON.stringify(this.auth.authenticated));
        });

        return null;
    }

}