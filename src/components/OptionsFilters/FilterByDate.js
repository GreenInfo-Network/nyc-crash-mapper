import React, { PropTypes, Component } from 'react';
import momentPropTypes from 'react-moment-proptypes';
import DatePicker from 'react-datepicker';

class FilterByDate extends Component {

  handleStartDateChange(date) {
    if (date.isBefore(this.props.endDate)) {
      this.props.startDateChange(date);
    }
  }

  handleEndDateChange(date) {
    if (date.isAfter(this.props.startDate)) {
      this.props.endDateChange(date);
    }
  }

  render() {
    const { startDate, endDate } = this.props;

    return (
      <ul className="filter-by-date filter-list">
        <li className="start-date">
          <p className="filter-date-label">Start Date:</p>
          <DatePicker
            dateFormat={'YYYY-MM-DD'}
            selected={startDate}
            onChange={date => this.handleStartDateChange(date)}
          />
        </li>
        <li className="end-date">
          <p className="filter-date-label">End Date:</p>
          <DatePicker
            dateFormat={'YYYY-MM-DD'}
            selected={endDate}
            onChange={date => this.handleEndDateChange(date)}
          />
        </li>
      </ul>
    );
  }
}

// react-datepicker requires dates to be moment objects
FilterByDate.propTypes = {
  startDateChange: PropTypes.func.isRequired,
  endDateChange: PropTypes.func.isRequired,
  startDate: momentPropTypes.momentObj.isRequired,
  endDate: momentPropTypes.momentObj.isRequired
};

export default FilterByDate;
