import * as React from 'react';

import './../../styles/modals.scss';

export default class ShareModal extends React.Component {

    constructor(props) {
        super(props);

        this.escFunction = this.escFunction.bind(this);
        this.preventClose = this.preventClose.bind(this);

        // TODO: ajax call to get url
    }

    escFunction(event) {
        if (event.keyCode === 27) {
            this.props.onCloseDialog();
        }
    }

    preventClose(event) {
        event.stopPropagation();
    }

    componentDidMount() {
        document.addEventListener('keydown', this.escFunction, false);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escFunction, false);
    }

    render() {
        return (
            <div className={"ez-modal-backdrop" + (!this.props.visible ? " hidden" : "")} onClick={this.props.onCloseDialog}>
                <div className="ez-modal share-modal" tabindex="-1" role="dialog" onClick={this.preventClose}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Share Resume</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button">
                                            <i className="fa fa-copy"></i>
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.props.onCloseDialog}>OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}