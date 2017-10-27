import React from 'react';

import Header from "./header/Header";

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app-container">
                <Header />
                {this.props.children}
            </div>
        );
    }

}