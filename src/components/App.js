import React, { Component, PropTypes } from 'react';
import momentPropTypes from 'react-moment-proptypes';
import queryString from 'query-string';

import { dateStringFormatModel, crashDataChanged } from '../constants/api';
import AppHeader from './AppHeader';
import LeafletMapConnected from '../containers/LeafletMapConnected';
import StatsLegendConnected from '../containers/StatsLegendConnected';
import OptionsFiltersConnected from '../containers/OptionsFiltersConnected';
import ModalConnected from '../containers/ModalConnected';
import SmallDeviceMessage from './SmallDeviceMessage';
import LoadingIndicator from './LoadingIndicator';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false
    };
    this.dataLoading = this.dataLoading.bind(this);
    this.onMapMoved = this.onMapMoved.bind(this);
  }

  componentWillMount() {
    // async calls for UI dependent on data
    this.props.fetchCrashesYearRange()
      .then(this.props.fetchCrashesDateRange())
      .then(this.props.fetchCrashesMaxDate())
      .then(this.props.fetchCrashStatsData(this.props))
      .then(this.props.fetchContributingFactors(this.props))
      .catch((error) => { throw error; });
  }

  componentWillReceiveProps(nextProps) {
    if (crashDataChanged(this.props, nextProps)) {
      const { query } = this.props.location;
      this.updateQueryParams({ ...query, ...nextProps });

      this.props.fetchCrashStatsData(nextProps)
        .then(this.props.fetchContributingFactors(nextProps))
        .catch((error) => { throw error; });
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
    const { lat, lng, zoom, startDate, endDate, identifier, geo, lngLats } = params;
    const { filterType, filterVehicle } = params;
    const { injury, fatality, noInjuryFatality } = filterType;
    const { vehicle } = filterVehicle;

    const newQueryParams = {
      lat,
      lng,
      zoom,
      startDate: startDate.format(dateStringFormatModel),
      endDate: endDate.format(dateStringFormatModel),
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
      vcar: vehicle.car,
      vtruck: vehicle.truck,
      vmotorcycle: vehicle.motorcycle,
      vbicycle: vehicle.bicycle,
      vsuv: vehicle.suv,
      vbusvan: vehicle.busvan,
      vscooter: vehicle.scooter,
      vother: vehicle.other,
    };

    this.context.router.push(`?${queryString.stringify(newQueryParams)}`);
  }

  dataLoading(bool) {
    this.setState({ isLoading: bool });
  }

  render() {
    const { isLoading } = this.state;
    const { location, openModal, height, width } = this.props;

    return (
      <div className="App">
        { /* hide app to mobile users for now */
          (width < 768 || height < 416) ?
            <SmallDeviceMessage /> :
          [
            <AppHeader key="app-header" openModal={openModal} />,
            <LeafletMapConnected
              key="leaflet-map"
              location={location}
              dataLoading={this.dataLoading}
              isLoading={isLoading}
              onMapMoved={this.onMapMoved}
            />,
            <LoadingIndicator key="loading-indicator" isLoading={isLoading} />,
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
  fetchContributingFactors: PropTypes.func.isRequired,
  fetchCrashesDateRange: PropTypes.func.isRequired,
  fetchCrashStatsData: PropTypes.func.isRequired,
  fetchCrashesMaxDate: PropTypes.func.isRequired,
  fetchCrashesYearRange: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  location: PropTypes.shape({
    query: PropTypes.object.isRequired
  }).isRequired,
  startDate: momentPropTypes.momentObj.isRequired,
  endDate: momentPropTypes.momentObj.isRequired,
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
  filterVehicle: PropTypes.shape({
    vehicle: PropTypes.shape({
      car: PropTypes.bool.isRequired,
      truck: PropTypes.bool.isRequired,
      motorcycle: PropTypes.bool.isRequired,
      bicycle: PropTypes.bool.isRequired,
      suv: PropTypes.bool.isRequired,
      busvan: PropTypes.bool.isRequired,
      scooter: PropTypes.bool.isRequired,
      other: PropTypes.bool.isRequired,
    }).isRequired,
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
