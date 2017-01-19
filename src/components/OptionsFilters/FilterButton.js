import React, { PropTypes } from 'react';
import cx from 'classnames';

const FilterButton = (props) => {
  const { filterName, callback, btnType } = props;

  const btnClasses = cx(btnType, {
    'filter-options-button': true,
    'roboto-medium': true
  });

  return (
    <button
      className={btnClasses}
      onClick={() => callback(filterName)}
    >
      { filterName }
    </button>
  );
};

FilterButton.defaultProps = {
  btnType: 'wide'
};

FilterButton.propTypes = {
  btnType: PropTypes.string,
  filterName: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired
};

export default FilterButton;
