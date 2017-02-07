import React, { PropTypes } from 'react';

import FilterButton from './FilterButton';

const FooterOptions = (props) => {
  const { openModal } = props;

  return (
    <div className="options-filters-footer">
      <FilterButton
        label={'Disclaimer'}
        id={'disclaimer'}
        handleClick={openModal}
        btnSize={'link'}
      />
      <FilterButton
        label={'About'}
        id={'about'}
        handleClick={openModal}
        btnSize={'link'}
      />
      <FilterButton
        label={'Copyright'}
        id={'copyright'}
        handleClick={openModal}
        btnSize={'link'}
      />
    </div>
  );
};

FooterOptions.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default FooterOptions;
