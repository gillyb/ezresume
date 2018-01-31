import * as React from 'react';
import ShareModal from './ShareModal';

export default class ResumeActions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showShareDialog: false
        };

        this.openPreview = this.openPreview.bind(this);
        this.openShareDialog = this.openShareDialog.bind(this);
        this.closeShareDialog = this.closeShareDialog.bind(this);
    }

    openPreview() {
        // TODO: Not sure we should leave the url like this (maybe make it fancier)
        window.open(window.location.href + '?public', 'resume_preview');
    }

    openShareDialog() {
        // TODO: open share dialog
        // TODO: maybe we need to build the url
        this.setState({ showShareDialog: true });
    }

    closeShareDialog() {
        this.setState({ showShareDialog: false });
    }

    // Sharing Resume
    // Requirements
    // - Choose vanity url
    // - Copy the link, or email it to someone

    // ezresume.io/gilly-barr

    render() {
        return (
            <div className="resume-tools">
                <button onClick={this.openPreview} type="button" className="btn btn-outline-secondary btn-sm btn-action">
                    <i className="fa fa-desktop" />Preview
                </button>
                <button onClick={this.openShareDialog} type="button" className="btn btn-outline-secondary btn-sm btn-action">
                    <i className="fa fa-external-link" />Share
                </button>
                <ShareModal visible={this.state.showShareDialog} onCloseDialog={this.closeShareDialog} />
            </div>
        );
    }
}