import React, { PropTypes } from 'react';

import FilterButton from './FilterButton';

const DownloadData = (props) => {
  const { lastUpdated, openModal } = props;

  return (
    <div className="download-data">
      <FilterButton
        filterName={'Download Data'}
        btnType={'auto'}
        callback={() => openModal('download-data')}
      />
      <div className="data-last-updated">
        <p>{`Map data last updated ${lastUpdated}`}</p>
      </div>
    </div>
  );
};

DownloadData.propTypes = {
  openModal: PropTypes.func.isRequired,
  lastUpdated: PropTypes.string.isRequired,
};

export default DownloadData;
