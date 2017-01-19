import React, { PropTypes } from 'react';

import FilterButton from './FilterButton';

const DownloadData = (props) => {
  const { lastUpdated } = props;

  return (
    <div className="download-data">
      <FilterButton
        filterName={'Download Data'}
        btnType={'auto'}
        callback={() => {}}
      />
      <div className="data-last-updated">
        <p>{`Map data last updated ${lastUpdated}`}</p>
      </div>
    </div>
  );
};

DownloadData.propTypes = {
  lastUpdated: PropTypes.string.isRequired
};

export default DownloadData;
