import React, { Component, PropTypes } from 'react';

class SearchResults extends Component {
  static propTypes = {
    clearLocationGeocode: PropTypes.func.isRequired,
    error: PropTypes.string,
    filterByLocation: PropTypes.func.isRequired,
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

  handleFilterResult = (e) => {
    e.preventDefault();
    const { result } = this.props;
    this.props.filterByLocation(result.coordinates);
  }

  closeThisPanel = (e) => {
    e.preventDefault();
    this.props.clearLocationGeocode();
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
        <button onClick={this.closeThisPanel} className="close" key="closebutton">✕</button>,
        <p key="message">Filter crashes by this location?</p>,
        <p className="address" key="result">{result.addressFormatted}</p>,
        <button
          className="filter-options-button"
          key="filter-result"
          onClick={this.handleFilterResult}
        >
          Filter Crashes
        </button>
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
