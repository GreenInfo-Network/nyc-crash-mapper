import React, { PropTypes } from 'react';

import FilterButton from './FilterButton';

const DownloadData = (props) => {
  const { lastUpdated, openModal } = props;

  return (
    <div className="download-data">
      <FilterButton
        label={'Download Data'}
        id={'download-data'}
        btnSize={'auto'}
        handleClick={openModal}
      />
      <div className="data-last-updated">
        <p>Data last updated on:</p>
        <p>{lastUpdated}</p>
      </div>
    </div>
  );
};

DownloadData.propTypes = {
  openModal: PropTypes.func.isRequired,
  lastUpdated: PropTypes.string.isRequired,
};

export default DownloadData;
