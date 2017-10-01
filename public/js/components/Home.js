import React from 'react';

export default class HomeComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // TODO: check if the user is logged in. if so, redirect to their resumes list
    }

    render() {
        return (
            <div className="home">Hello world</div>
        );
    }

}