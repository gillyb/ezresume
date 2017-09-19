import React from 'react';

export default class DisplayTimeRange extends React.Component {

    constructor(props) {
        super(props);

        this.months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    }

    render() {

        // start date
        let startDate;
        if (this.props.startDate) {
            let startMonth = this.props.startDate.month;
            let startYear = this.props.startDate.year;

            let startMonthElement = (startMonth ? <span className="month">{this.months[startMonth]}</span> : '');
            let startYearElement = (startYear ? <span className="year">{startYear}</span> : '');

            startDate = <span className="startdate">{startMonthElement}{startYearElement}</span>;
        }

        // end date
        let endDate;
        if (this.props.endDate) {
            if (this.props.endDate.current) {
                endDate = <span className="current">Current</span>;
            }
            else {
                let endMonth = this.props.endDate.month;
                let endYear = this.props.endDate.year;

                let endMonthElement = (endMonth ? <span className="month">{this.months[endMonth]}</span> : '');
                let endYearElement = (endYear ? <span className="year">{endYear}</span> : '');

                endDate = <span className="enddate">{endMonthElement}{endYearElement}</span>;
            }
        }

        return (
            <div className="timerange">
                {startDate} - {endDate}
            </div>
        );
    }

}