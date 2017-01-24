import React, { PropTypes, Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class FilterByDate extends Component {

  render() {
    const { startDate, endDate, startDateChange, endDateChange } = this.props;

    // react-datepicker requires dates to be moment objects
    const startDateMoment = moment(startDate, 'YYYY-MM-DD', true);
    const endDateMoment = moment(endDate, 'YYYY-MM-DD', true);

    return (
      <ul className="filter-by-date filter-list">
        <li className="start-date">
          <p className="filter-date-label">Start Date:</p>
          <DatePicker
            dateFormat={'YYYY-MM-DD'}
            selected={startDateMoment}
            onChange={date => startDateChange(date.format('YYYY-MM-DD'))}
          />
        </li>
        <li className="end-date">
          <p className="filter-date-label">End Date:</p>
          <DatePicker
            dateFormat={'YYYY-MM-DD'}
            selected={endDateMoment}
            onChange={date => endDateChange(date.format('YYYY-MM-DD'))}
          />
        </li>
      </ul>
    );
  }
}

FilterByDate.propTypes = {
  startDateChange: PropTypes.func.isRequired,
  endDateChange: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired
};

export default FilterByDate;
