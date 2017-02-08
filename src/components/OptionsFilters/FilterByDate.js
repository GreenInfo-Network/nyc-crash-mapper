import React, { PropTypes, Component } from 'react';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';

import MonthYearSelector from './MonthYearSelector';

class FilterByDate extends Component {
  constructor() {
    super();
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  handleStartDateChange(year, month) {
    const { endDate } = this.props;
    const startMoment = moment()
      .year(year)
      .month(month - 1);

    if (startMoment.isSameOrBefore(endDate)) {
      this.props.startDateChange(startMoment);
    }
  }

  handleEndDateChange(year, month) {
    const { startDate } = this.props;
    const endMoment = moment()
      .year(year)
      .month(month - 1);

    if (endMoment.isSameOrAfter(startDate)) {
      this.props.endDateChange(endMoment);
    }
  }

  render() {
    const { startDate, endDate } = this.props;
    const startMonth = startDate.month() + 1;
    const startYear = startDate.year();
    const endMonth = endDate.month() + 1;
    const endYear = endDate.year();

    return (
      <div>
        <MonthYearSelector
          handleChange={this.handleStartDateChange}
          years={[2011, 2012]}
          curMonth={startMonth}
          curYear={startYear}
          prefix="Start"
        />
        <MonthYearSelector
          handleChange={this.handleEndDateChange}
          years={[2011, 2012]}
          curMonth={endMonth}
          curYear={endYear}
          prefix="End"
        />
      </div>
    );
  }
}

// react-datepicker requires dates to be moment objects
FilterByDate.propTypes = {
  startDateChange: PropTypes.func.isRequired,
  endDateChange: PropTypes.func.isRequired,
  startDate: momentPropTypes.momentObj.isRequired,
  endDate: momentPropTypes.momentObj.isRequired,
};

export default FilterByDate;

// <ul className="filter-by-date filter-list">
//   <li className="start-date">
//     <p className="filter-date-label">Start Date:</p>
//     <DatePicker
//       dateFormat={'YYYY-MM-DD'}
//       selected={startDate}
//       onChange={date => this.handleStartDateChange(date)}
//     />
//   </li>
//   <li className="end-date">
//     <p className="filter-date-label">End Date:</p>
//     <DatePicker
//       dateFormat={'YYYY-MM-DD'}
//       selected={endDate}
//       onChange={date => this.handleEndDateChange(date)}
//     />
//   </li>
// </ul>
