import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import Select from 'react-select';

class MonthYearSelector extends Component {

  setMonthValue() {
    // correct month value if user has it set to one outside of min & max date
    // range when switching year
    const { curMonth, curYear, crashesDateRange: { minDate, maxDate } } = this.props;

    if (curYear === minDate.year() && curMonth < minDate.month() + 1) {
      return minDate.month() + 1;
    }

    if (curYear === maxDate.year() && curMonth > maxDate.month() + 1) {
      return maxDate.month() + 1;
    }

    return curMonth;
  }

  parseMonthOptions() {
    // if the user selects a year that is the year of the min or max date in our dataset,
    // make sure they cannot choose a month outside of months available for that year as well.
    const { curYear, crashesDateRange: { minDate, maxDate } } = this.props;

    // months in a year, human readable
    const months = moment.months().map((month, i) => ({
      value: i + 1,
      label: month
    }));

    if (curYear === minDate.year() || curYear === maxDate.year()) {
      return months.filter((month) => {
        if (curYear === minDate.year() && month.value >= minDate.month() + 1) {
          return true;
        } else if (curYear === maxDate.year() && month.value <= maxDate.month() + 1) {
          return true;
        }
        return false;
      });
    }

    return months;
  }

  render() {
    const { crashesDateRange, handleChange, years, curYear, curMonth, prefix } = this.props;
    const { minDate, maxDate } = crashesDateRange;

    // years are the distinct year values in the dataset
    const yearOptions = years.map(year => ({
      value: year,
      label: year
    }));

    // minDate and maxDate are loaded async
    if (moment.isMoment(minDate) && moment.isMoment(maxDate)) {
      const monthOptions = this.parseMonthOptions();

      return (
        <div className="month-year-selector">
          <div className="label-select-group">
            <label htmlFor="filter-by-year-month">
              {`${prefix} Month`}
            </label>
            <Select
              className="month-selector"
              name="filter-by-year-month"
              options={monthOptions}
              onChange={m => handleChange(curYear, m.value)}
              matchPos="start"
              ignoreCase
              clearable={false}
              value={curMonth}
            />
          </div>
          <div className="label-select-group">
            <label htmlFor="filter-by-year-month">
              {`${prefix} Year`}
            </label>
            <Select
              className="year-selector"
              name="filter-by-year-month"
              options={yearOptions}
              onChange={y => handleChange(y.value, curMonth)}
              matchPos="start"
              clearable={false}
              value={curYear}
            />
          </div>
        </div>
      );
    }

    return null;
  }
}

MonthYearSelector.propTypes = {
  crashesDateRange: PropTypes.shape({
    min: momentPropTypes.momentObj,
    max: momentPropTypes.momentObj,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  years: PropTypes.arrayOf(
    PropTypes.number
  ).isRequired,
  curYear: PropTypes.number.isRequired,
  curMonth: PropTypes.number.isRequired,
  prefix: PropTypes.string.isRequired,
};

export default MonthYearSelector;
