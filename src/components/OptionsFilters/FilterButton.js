import React, { PropTypes } from 'react';
import cx from 'classnames';

const FilterButton = (props) => {
  const { label, btnSize, id, handleClick, isActive, preventRetrigger } = props;

  const btnClasses = cx(btnSize, {
    'filter-options-button': true,
    'roboto-medium': true,
    active: isActive
  });

  function a() {
    if (preventRetrigger) {
      if (!isActive) {
        handleClick(id);
      }
    } else {
      handleClick(id);
    }
  }

  return (
    <button
      className={btnClasses}
      onClick={() => a()}
    >
      { label }
    </button>
  );
};

FilterButton.defaultProps = {
  btnSize: 'wide',
  isActive: false,
  preventRetrigger: false,
};

FilterButton.propTypes = {
  btnSize: PropTypes.string,
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  preventRetrigger: PropTypes.bool,
};

export default FilterButton;
