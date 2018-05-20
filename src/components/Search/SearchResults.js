import React, { Component, PropTypes } from 'react';

import { intersectionCircleRadiusFeet } from '../../constants/app_config';

class SearchResults extends Component {
  static propTypes = {
    resetLocationSearch: PropTypes.func.isRequired,
    error: PropTypes.string,
    filterByLocation: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    selectedFeature: PropTypes.shape({}),
  }

  static defaultProps = {
    error: null,
    result: null,
    selectedFeature: null
  }

  handleFilterResult = (e) => {
    e.preventDefault();
    const { selectedFeature } = this.props;
    this.props.filterByLocation(selectedFeature.coordinates);
  }

  closeThisPanel = (e) => {
    e.preventDefault();
    this.props.resetLocationSearch();
  }

  showSearchResult = () => {
    const { error, isFetching, selectedFeature } = this.props;

    if (isFetching) {
      return (<p>searching...</p>);
    } else if (error) {
      return (<p>{error}</p>);
    } else if (selectedFeature) {
      return [
        <button onClick={this.closeThisPanel} className="close" key="closebutton">✕</button>,
        <p key="message">Filter crashes within {intersectionCircleRadiusFeet} feet of this location?</p>,
        <p className="address" key="result">{selectedFeature.properties.label}</p>,
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
