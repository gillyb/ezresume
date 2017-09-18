import React from 'react';
import DateInput from "./DateInput";

export default class TimeRangeEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            startDate: this.props.startDate,
            endDate: this.props.endDate
        }
    }

    render() {
        return (
            <div className="timerange-edit">
                <div className="start-date">
                    <span className="label">From : </span>
                    <DateInput date={this.state.startDate} />
                </div>
                <div className="end-date">
                    <span className="label">To : </span>
                    <DateInput date={this.state.endDate} allowCurrent={true} />
                </div>
            </div>
        );
    }

}