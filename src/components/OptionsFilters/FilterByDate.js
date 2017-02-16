import React, { PropTypes, Component } from 'react';
import momentPropTypes from 'react-moment-proptypes';

import { momentize } from '../../constants/api';
import MonthYearSelector from './MonthYearSelector';

class FilterByDate extends Component {
  constructor() {
    super();
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  handleStartDateChange(year, month) {
    const { endDate, crashesDateRange: { minDate } } = this.props;

    if (year === minDate.year() && month < minDate.month() + 1) {
      month = minDate.month() + 1;
    }

    const mm = month < 10 ? `0${month}` : month;
    const startMoment = momentize(`${year}-${mm}`);

    if (startMoment.isSameOrBefore(endDate)) {
      this.props.startDateChange(startMoment);
    }
  }

  handleEndDateChange(year, month) {
    const { startDate, crashesDateRange: { maxDate } } = this.props;

    if (year === maxDate.year() && month > maxDate.month() + 1) {
      month = maxDate.month() + 1;
    }

    const mm = month < 10 ? `0${month}` : month;
    const endMoment = momentize(`${year}-${mm}`);

    if (endMoment.isSameOrAfter(startDate)) {
      this.props.endDateChange(endMoment);
    }
  }

  render() {
    const { crashesDateRange, startDate, endDate, years } = this.props;
    // months in moment.js are zero based
    const startMonth = startDate.month() + 1;
    const startYear = startDate.year();
    const endMonth = endDate.month() + 1;
    const endYear = endDate.year();

    return (
      <div className="filter-by-date">
        <ul className="filter-list">
          <li>
            <MonthYearSelector
              handleChange={this.handleStartDateChange}
              years={years}
              curMonth={startMonth}
              curYear={startYear}
              prefix="Start"
              crashesDateRange={crashesDateRange}
            />
          </li>
          <li>
            <MonthYearSelector
              handleChange={this.handleEndDateChange}
              years={years}
              curMonth={endMonth}
              curYear={endYear}
              prefix="End"
              crashesDateRange={crashesDateRange}
            />
          </li>
        </ul>
      </div>
    );
  }
}

// react-datepicker requires dates to be moment objects
FilterByDate.propTypes = {
  crashesDateRange: PropTypes.shape({
    minDate: momentPropTypes.momentObj,
    maxDate: momentPropTypes.momentObj,
  }).isRequired,
  startDateChange: PropTypes.func.isRequired,
  endDateChange: PropTypes.func.isRequired,
  startDate: momentPropTypes.momentObj.isRequired,
  endDate: momentPropTypes.momentObj.isRequired,
  years: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default FilterByDate;
