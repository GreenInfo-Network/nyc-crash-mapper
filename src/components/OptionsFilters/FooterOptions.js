import React, { PropTypes } from 'react';

import FilterButton from './FilterButton';

const FooterOptions = (props) => {
  const { openModal } = props;

  return (
    <div className="options-filters-footer">
      <FilterButton
        filterName={'Disclaimer'}
        callback={() => openModal('disclaimer')}
        btnType={'link'}
      />
      <FilterButton
        filterName={'About'}
        callback={() => openModal('about')}
        btnType={'link'}
      />
      <FilterButton
        filterName={'Copyright'}
        callback={() => openModal('copyright')}
        btnType={'link'}
      />
    </div>
  );
};

FooterOptions.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default FooterOptions;
