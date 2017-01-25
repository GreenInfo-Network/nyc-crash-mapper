import React, { PropTypes } from 'react';

const DateRange = (props) => {
  const { startDate, endDate } = props;

  return (
    <div className="stats-date-range">
      <h6 className="stats-title">{`From ${startDate} – ${endDate}`}</h6>
    </div>
  );
};

DateRange.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired
};

export default DateRange;
