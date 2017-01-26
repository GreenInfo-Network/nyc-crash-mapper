import React, { Component, PropTypes } from 'react';
import queryString from 'query-string';

import AppHeader from './AppHeader';
import LeafletMapConnected from '../containers/LeafletMapConnected';
import StatsLegendConnected from '../containers/StatsLegendConnected';
import OptionsFiltersConnected from '../containers/OptionsFiltersConnected';

class App extends Component {
  constructor() {
    super();
    this.onMapMoved = this.onMapMoved.bind(this);
  }

  onMapMoved(event) {
    // update the url query params with map center & zoom
    if (event && event.target) {
      const query = {};
      query.zoom = event.target.getZoom();
      query.lat = event.target.getCenter().lat;
      query.lng = event.target.getCenter().lng;
      this.updateQueryParams(query);
    }
  }

  updateQueryParams(params) {
    const { lat, lng, zoom } = params;
    const newQueryParams = {};
    newQueryParams.lat = lat || null;
    newQueryParams.lng = lng || null;
    newQueryParams.zoom = zoom || null;
    this.context.router.push(`?${queryString.stringify(newQueryParams)}`);
  }

  render() {
    const { location } = this.props;
    return (
      <div className="App">
        <AppHeader />
        <LeafletMapConnected
          location={location}
          onMapMoved={this.onMapMoved}
        />
        <StatsLegendConnected />
        <OptionsFiltersConnected />
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.object.isRequired
  }).isRequired
};

App.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default App;
