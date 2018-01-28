import * as React from 'react';

export default class ResumeActions extends React.Component {

    constructor(props) {
        super(props);

        this.openPreview = this.openPreview.bind(this);
        this.openShareDialog = this.openShareDialog.bind(this);
    }

    openPreview() {
        // TODO: Not sure we should leave the url like this (maybe make it fancier)
        window.open(window.location.href + '?public', 'resume_preview');
    }

    openShareDialog() {
        // TODO: open share dialog
    }

    render() {
        return (
            <div className="resume-tools">
                <button onClick={this.openPreview} type="button" className="btn btn-outline-secondary btn-sm">
                    Preview
                </button>
                <button onClick={this.openShareDialog} type="button" className="btn btn-outline-secondary btn-sm">
                    Share
                </button>
            </div>
        );
    }
}