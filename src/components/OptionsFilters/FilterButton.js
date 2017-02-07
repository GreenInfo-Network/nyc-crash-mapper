import React, { PropTypes } from 'react';
import cx from 'classnames';

const FilterButton = (props) => {
  const { label, btnSize, id, handleClick, isActive } = props;

  const btnClasses = cx(btnSize, {
    'filter-options-button': true,
    'roboto-medium': true,
    active: isActive
  });

  return (
    <button
      className={btnClasses}
      onClick={() => { if (!isActive) handleClick(id); }}
    >
      { label }
    </button>
  );
};

FilterButton.defaultProps = {
  btnSize: 'wide',
  isActive: false,
};

FilterButton.propTypes = {
  btnSize: PropTypes.string,
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

export default FilterButton;
