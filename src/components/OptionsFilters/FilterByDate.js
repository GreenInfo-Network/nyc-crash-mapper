import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class FilterByDate extends Component {
  constructor() {
    super();
    this.state = {
      startDate: moment('2016/07/01', 'YYYY/MM/DD', true),
      endDate: moment('2016/12/31', 'YYYY/MM/DD', true)
    };

    // to do: these will become action creators
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
  }

  handleStartChange(date) {
    // to do: make sure date is less than endDate
    // make sure date does not go below min date of data
    this.setState({
      startDate: date
    });
  }

  handleEndChange(date) {
    // to do: make sure date is greater than startDate
    // make sure date does not go above last date in data
    this.setState({
      endDate: date
    });
  }

  render() {
    const { startDate, endDate } = this.state;

    return (
      <ul className="filter-by-date filter-list">
        <li className="start-date">
          <p className="filter-date-label">Start Date:</p>
          <DatePicker
            selected={startDate}
            onChange={this.handleStartChange}
          />
        </li>
        <li className="end-date">
          <p className="filter-date-label">End Date:</p>
          <DatePicker
            selected={endDate}
            onChange={this.handleEndChange}
          />
        </li>
      </ul>
    );
  }
}

export default FilterByDate;
