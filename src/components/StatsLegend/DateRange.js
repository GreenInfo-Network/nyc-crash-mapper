import React, { PropTypes } from 'react';

const DateRange = (props) => {
  const { startDate, endDate } = props;

  return (
    <div className="stats-date-range">
      <h6>{`From ${startDate} – ${endDate}:`}</h6>
    </div>
  );
};

DateRange.defaultProps = {
  startDate: '',
  endDate: ''
};

DateRange.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string
};

export default DateRange;
