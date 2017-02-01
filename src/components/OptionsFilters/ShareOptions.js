import React, { PropTypes } from 'react';

import FilterButton from './FilterButton';

const ShareOptions = (props) => {
  const { openModal } = props;

  return (
    <div className="share-options">
      <FilterButton
        filterName={'URL'}
        callback={() => openModal('share-url')}
        btnType={'auto'}
      />
      <FilterButton
        filterName={'Facebook'}
        callback={() => openModal('share-fb')}
        btnType={'auto'}
      />
      <FilterButton
        filterName={'Twitter'}
        callback={() => openModal('share-tw')}
        btnType={'auto'}
      />
    </div>
  );
};

ShareOptions.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default ShareOptions;
