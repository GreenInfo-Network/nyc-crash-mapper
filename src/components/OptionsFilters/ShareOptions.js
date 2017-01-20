import React from 'react';

import FilterButton from './FilterButton';

const ShareOptions = () => {
  // TO DO: replace noops with actual function calls
  const noop = () => {};

  return (
    <div className="share-options">
      <FilterButton
        filterName={'URL'}
        callback={noop}
        btnType={'auto'}
      />
      <FilterButton
        filterName={'Facebook'}
        callback={noop}
        btnType={'auto'}
      />
      <FilterButton
        filterName={'Twitter'}
        callback={noop}
        btnType={'auto'}
      />
    </div>
  );
};

export default ShareOptions;
