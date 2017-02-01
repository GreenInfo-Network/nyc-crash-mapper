import React, { Component, PropTypes } from 'react';
import queryString from 'query-string';

import AppHeader from './AppHeader';
import LeafletMapConnected from '../containers/LeafletMapConnected';
import StatsLegendConnected from '../containers/StatsLegendConnected';
import OptionsFiltersConnected from '../containers/OptionsFiltersConnected';
import ModalConnected from '../containers/ModalConnected';

class App extends Component {
  constructor() {
    super();
    this.onMapMoved = this.onMapMoved.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { startDate, endDate } = nextProps;
    if (startDate !== this.props.startDate || endDate !== this.props.endDate) {
      this.updateQueryParams({ startDate, endDate });
    }
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
    // updates the URL location query with app state filters & map zoom & center
    // this allows for "stateful URLs" so that when app loads, it will load
    // with the same filters & map zoom & center last viewed, enabling sharing
    // of unique views of the data via the URL between users
    const { lat, lng, zoom, startDate, endDate } = params;
    const { query } = this.props.location;

    const newQueryParams = {
      lat: lat || query.lat,
      lng: lng || query.lng,
      zoom: zoom || query.zoom,
      startDate: startDate || this.props.startDate,
      endDate: endDate || this.props.endDate,
    };

    this.context.router.push(`?${queryString.stringify(newQueryParams)}`);
  }

  render() {
    const { location, openModal } = this.props;
    return (
      <div className="App">
        <AppHeader openModal={openModal} />
        <LeafletMapConnected
          location={location}
          onMapMoved={this.onMapMoved}
        />
        <StatsLegendConnected />
        <OptionsFiltersConnected />
        <ModalConnected />
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.object.isRequired
  }).isRequired,
  openModal: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired
};

App.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default App;
