import React from 'react';
import DateInput from "./DateInput";

export default class TimeRangeEditor extends React.Component {

    constructor(props) {
        super(props);

        // TODO: I think i can delete this, since I don't really use it.
        this.state = {
            startDate: this.props.startDate,
            endDate: this.props.endDate
        };

        this.updateStartDate = this.updateStartDate.bind(this);
        this.updateEndDate = this.updateEndDate.bind(this);
    }

    updateStartDate(newState) {
        this.props.onUpdate('startDate', newState);
    }

    updateEndDate(newState) {
        this.props.onUpdate('endDate', newState);
    }

    render() {
        return (
            <div className="timerange-edit">
                <div className="start-date form-group row">
                    <label className="col-sm-2 col-form-label">From</label>
                    <DateInput
                        name="startDate"
                        date={this.props.startDate}
                        onUpdate={this.updateStartDate}
                    />
                </div>
                <div className="end-date form-group row">
                    <label className="col-sm-2 col-form-label">To</label>
                    <DateInput
                        name="endDate"
                        date={this.props.endDate}
                        onUpdate={this.updateEndDate}
                        allowCurrent={true} />
                </div>
            </div>
        );
    }

}