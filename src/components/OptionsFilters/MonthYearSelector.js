import React, { PropTypes } from 'react';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import Select from 'react-select';

const MonthYearSelector = (props) => {
  const { crashesDateRange, handleChange, years, curYear, curMonth, prefix } = props;
  const { minDate, maxDate } = crashesDateRange;

  // years are the distinct year values in the dataset
  const yearOptions = years.map(year => ({
    value: year,
    label: year
  }));

  const monthOptions = moment.months().map((month, i) => ({
    value: i + 1,
    label: month
  }));

  // minDate and maxDate are loaded async
  if (moment.isMoment(minDate) && moment.isMoment(maxDate)) {
    return (
      <div className="month-year-selector">
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
      </div>
    );
  }

  return null;
};

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
