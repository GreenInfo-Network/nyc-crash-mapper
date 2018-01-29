import React, { Component, PropTypes } from 'react';

class SearchResults extends Component {
  static propTypes = {
    error: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
    searchTerm: PropTypes.string,
    result: PropTypes.shape({
      addressFormatted: PropTypes.string,
      coordinates: PropTypes.arrayOf(PropTypes.number)
    }),
  }

  static defaultProps = {
    error: null,
    result: null,
    searchTerm: null
  }

  showSearchResult = () => {
    const { error, isFetching, result } = this.props;

    if (isFetching) {
      return (<p>searching...</p>);
    }

    if (error) {
      return (<p>{error}</p>);
    }

    if (result) {
      return [
        <p key="message">Filter crashes by this location?</p>,
        <p key="result">{result.addressFormatted}</p>,
        <button className="filter-options-button" key="filter-result">Filter Crashes</button>,
        <button className="filter-options-button" key="search-again">Search Again</button>
      ];
    }

    return null;
  }

  render() {
    return (
      <div className="SearchResults ui">
        {this.showSearchResult()}
      </div>
    );
  }
}

export default SearchResults;
