import React, { PropTypes } from 'react';

const FilterButton = (props) => {
  const { filterName, callback } = props;

  return (
    <button
      className="filter-options-button roboto-medium"
      onClick={() => callback(filterName)}
    >
      { filterName }
    </button>
  );
};

FilterButton.propTypes = {
  filterName: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired
};

export default FilterButton;
