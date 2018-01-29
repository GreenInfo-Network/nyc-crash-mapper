import React, { PropTypes } from 'react';

import SearchForm from './SearchForm';

const Search = props => (
  <div className="Search ui">
    <SearchForm {...props} />
  </div>
);

Search.propTypes = {
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string,
  result: PropTypes.shape({
    addressFormatted: PropTypes.string,
    coordinates: PropTypes.arrayOf(PropTypes.number)
  }),
  fetchLocationGeocode: PropTypes.func.isRequired,
};

Search.defaultProps = {
  error: null,
  result: null,
  searchTerm: null
};

export default Search;
