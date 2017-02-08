import React, { Component, PropTypes } from 'react';
import queryString from 'query-string';

import { crashDataChanged } from '../constants/api';
import AppHeader from './AppHeader';
import LeafletMapConnected from '../containers/LeafletMapConnected';
import StatsLegendConnected from '../containers/StatsLegendConnected';
import OptionsFiltersConnected from '../containers/OptionsFiltersConnected';
import ModalConnected from '../containers/ModalConnected';
import SmallDeviceMessage from './SmallDeviceMessage';

class App extends Component {
  constructor() {
    super();
    this.onMapMoved = this.onMapMoved.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (crashDataChanged(this.props, nextProps)) {
      const { query } = this.props.location;
      this.updateQueryParams({ ...query, ...nextProps });
    }
  }

  onMapMoved(event) {
    // update the url query params with map center & zoom
    if (event && event.target) {
      const query = {};
      query.zoom = event.target.getZoom();
      query.lat = event.target.getCenter().lat;
      query.lng = event.target.getCenter().lng;
      this.updateQueryParams({ ...query, ...this.props });
    }
  }

  updateQueryParams(params) {
    // updates the URL location query with app state filters & map zoom & center
    // this allows for "stateful URLs" so that when app loads, it will load
    // with the same filters & map zoom & center last viewed, enabling sharing
    // of unique views of the data via the URL between users
    const { lat, lng, zoom, startDate, endDate, identifier, geo, lngLats, filterType } = params;
    const { injury, fatality, noInjuryFatality } = filterType;

    const newQueryParams = {
      lat,
      lng,
      zoom,
      startDate,
      endDate,
      identifier,
      geo,
      lngLats: encodeURIComponent(JSON.stringify(lngLats)),
      noInjFat: noInjuryFatality,
      cinj: injury.cyclist,
      minj: injury.motorist,
      pinj: injury.pedestrian,
      cfat: fatality.cyclist,
      mfat: fatality.motorist,
      pfat: fatality.pedestrian,
    };

    this.context.router.push(`?${queryString.stringify(newQueryParams)}`);
  }

  render() {
    const { location, openModal, height, width } = this.props;
    return (
      <div className="App">
        { /* hide app to mobile users for now */
          (width < 550 || height < 416) ?
            <SmallDeviceMessage /> :
          [
            <AppHeader key="app-header" openModal={openModal} />,
            <LeafletMapConnected
              key="leaflet-map"
              location={location}
              onMapMoved={this.onMapMoved}
            />,
            <StatsLegendConnected key="stats-legend" />,
            <OptionsFiltersConnected key="options-filters" />,
            <ModalConnected key="modal" />
          ]
        }
      </div>
    );
  }
}

App.defaultProps = {
  identifier: '',
  geo: '',
  lngLats: [],
};

App.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.object.isRequired
  }).isRequired,
  openModal: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  filterType: PropTypes.shape({
    noInjuryFatality: PropTypes.bool,
    injury: PropTypes.shape({
      cyclist: PropTypes.bool,
      motorist: PropTypes.bool,
      pedestrian: PropTypes.bool,
    }),
    fatality: PropTypes.shape({
      cyclist: PropTypes.bool,
      motorist: PropTypes.bool,
      pedestrian: PropTypes.bool,
    }),
  }).isRequired,
  identifier: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  geo: PropTypes.string,
  lngLats: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number)
  ),
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

App.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default App;
