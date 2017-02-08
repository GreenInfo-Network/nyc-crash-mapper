import React, { PropTypes } from 'react';
import moment from 'moment';
import Select from 'react-select';

const MonthYearSelector = (props) => {
  const { handleChange, years, curYear, curMonth, prefix } = props;

  // months in a year, human readable
  const monthOptions = moment.months().map((month, i) => ({
    value: i + 1,
    label: month
  }));

  // years are the distinct year values in the dataset
  const yearOptions = years.map(year => ({
    value: year,
    label: year
  }));

  return (
    <div className="month-year-selector">
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
  );
};

MonthYearSelector.propTypes = {
  handleChange: PropTypes.func.isRequired,
  years: PropTypes.arrayOf(
    PropTypes.number
  ).isRequired,
  curYear: PropTypes.number.isRequired,
  curMonth: PropTypes.number.isRequired,
  prefix: PropTypes.string.isRequired,
};

export default MonthYearSelector;
