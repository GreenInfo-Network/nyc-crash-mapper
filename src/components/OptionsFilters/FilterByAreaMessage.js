import React, { PropTypes } from 'react';

const FilterByAreaMessage = (props) => {
  const { geo } = props;

  // the stock message... or maybe not
  let message = 'Choose a boundary type, then click an area on the map to filter crashes within that area.';

  switch (geo) {
    case 'custom':
      message = 'Draw a custom area on the map.';
      break;
    case 'intersection':
      message = 'The 500 most dangerous intersections over last 2 years. Zoom in to see 90-foot radius for each.';
      break;
    default:
      break;
  }

  return (
    <p className="filter-by-boundary-message">
      {message}
    </p>
  );
};

FilterByAreaMessage.defaultProps = {
};

FilterByAreaMessage.propTypes = {
  geo: PropTypes.string.isRequired,
};

export default FilterByAreaMessage;
