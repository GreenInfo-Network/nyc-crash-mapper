import React, { PropTypes } from 'react';

import FilterButton from './FilterButton';

const ShareOptions = (props) => {
  const { openModal } = props;

  return (
    <div className="share-options">
      <FilterButton
        label={'URL'}
        id={'share-url'}
        handleClick={openModal}
        btnSize={'auto'}
      />
      <FilterButton
        label={'Facebook'}
        id={'share-fb'}
        handleClick={openModal}
        btnSize={'auto'}
      />
      <FilterButton
        label={'Twitter'}
        id={'share-tw'}
        handleClick={openModal}
        btnSize={'auto'}
      />
    </div>
  );
};

ShareOptions.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default ShareOptions;
