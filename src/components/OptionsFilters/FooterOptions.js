import React from 'react';

import FilterButton from './FilterButton';

const FooterOptions = () => {
  const noop = () => {};

  return (
    <div className="options-filters-footer">
      <FilterButton
        filterName={'Disclaimer'}
        callback={noop}
        btnType={'link'}
      />
      <FilterButton
        filterName={'About'}
        callback={noop}
        btnType={'link'}
      />
      <FilterButton
        filterName={'Copyright'}
        callback={noop}
        btnType={'link'}
      />
    </div>
  );
};

export default FooterOptions;
