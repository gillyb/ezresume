import React from 'react';

export default class DateInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            day: this.props.date.day,
            month: this.props.date.month,
            year: this.props.date.year
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let updatedState = Object.assign({}, this.state);
        updatedState[event.target.name] = parseInt(event.target.value);
        this.props.onUpdate(updatedState);
    }

    render() {
        const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].map((day) =>
            <option value={day} key={day}>{day}</option>
        );
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((month, index) =>
            <option value={index + 1} key={index}>{month}</option>
        );
        let years = [];
        for (var i=2018; i>=1950; i--) {
            years.push(<option value={i} key={i}>{i}</option>);
        }

        return (
            <div className="date-input">
                <select name="day" value={this.props.date.day} onChange={this.handleChange}>
                    <option value="0">Day</option>
                    {days}
                </select>
                <select name="month" value={this.state.month} onChange={this.handleChange}>
                    <option value="0">Month</option>
                    {months}
                </select>
                <select name="year" value={this.props.date.year} onChange={this.handleChange}>
                    <option value="0">Year</option>
                    {years}
                </select>
            </div>
        );
    }

}