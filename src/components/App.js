// @flow

// libraries
import React, { Component } from 'react';
import queryString from 'query-string';

// Flow types for App component
import { AppProps } from '../flow-types';

// Component imports
import { dateStringFormatModel, crashDataChanged } from '../constants/api';
import AppHeader from './AppHeader';
import LeafletMapConnected from '../containers/LeafletMapConnected';
import StatsLegendConnected from '../containers/StatsLegendConnected';
import OptionsFiltersConnected from '../containers/OptionsFiltersConnected';
import ModalConnected from '../containers/ModalConnected';
import SmallDeviceMessage from './SmallDeviceMessage';
import LoadingIndicator from './LoadingIndicator';


class App extends Component {
  props: AppProps;

  static defaultProps: {
    identifier: '',
    geo: '',
    lngLats: [],
  };

  state: {
    isLoading: boolean
  }

  contextTypes: {
    router: Object
  }

  onMapMoved: () => void;
  dataLoading: () => void;

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

  componentWillReceiveProps(nextProps: AppProps) {
    const changed = crashDataChanged(this.props, nextProps);
    if (changed) {
      const { query } = this.props.location;
      this.updateQueryParams({ ...query, ...nextProps });
      this.props.fetchCrashStatsData(nextProps)
        .then(this.props.fetchContributingFactors(nextProps))
        .catch((error) => { throw error; });
    }
  }

  onMapMoved(event: Object) {
    // update the url query params with map center & zoom
    if (event && event.target) {
      const query = {};
      query.zoom = event.target.getZoom();
      query.lat = event.target.getCenter().lat;
      query.lng = event.target.getCenter().lng;
      this.updateQueryParams({ ...query, ...this.props });
    }
  }

  updateQueryParams(params: Object) {
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
    };

    this.context.router.push(`?${queryString.stringify(newQueryParams)}`);
  }

  dataLoading(bool: boolean) {
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

// Do context types apply to Flow?
// removing this seems to prevent React Router from working
App.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default App;
