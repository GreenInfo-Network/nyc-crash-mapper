import React, { PropTypes } from 'react';

const TotalCrashCounter = (props) => {
  const { totalCount } = props;
  const crash = (totalCount > 1 || totalCount === 0) ? 'Crashes' : 'Crash';

  return (
    <div className="stats-total-crash-counter">
      <h6 className="stats-title">{`${totalCount} Total ${crash}`}</h6>
    </div>
  );
};

TotalCrashCounter.defaultProps = {
  totalCount: 0
};

TotalCrashCounter.propTypes = {
  totalCount: PropTypes.number.isRequired
};

export default TotalCrashCounter;
