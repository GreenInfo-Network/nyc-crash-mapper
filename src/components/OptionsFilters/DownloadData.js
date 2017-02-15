import React, { PropTypes } from 'react';

import FilterButton from './FilterButton';

const DownloadData = (props) => {
  const { openModal } = props;

  return (
    <div className="download-data">
      <FilterButton
        label={'Download Data'}
        id={'download-data'}
        btnSize={'auto'}
        handleClick={openModal}
      />
      <div className="data-last-updated">
        {/*
          <p>{`Map data last updated ${lastUpdated}`}</p>
        */ }
      </div>
    </div>
  );
};

DownloadData.propTypes = {
  openModal: PropTypes.func.isRequired,
  // lastUpdated: PropTypes.string.isRequired,
};

export default DownloadData;
