import { connect } from 'react-redux';

import {
  fetchCrashStatsData,
  fetchCrashesYearRange,
  fetchCrashesMaxDate,
  fetchCrashesDateRange,
  fetchContributingFactors,
  openModal,
} from '../actions/';

import App from '../components/App';

const mapStateToProps = ({ browser, filterDate, filterType, filterVehicle, filterArea }) => {
  const { startDate, endDate } = filterDate;
  const { identifier, geo, lngLats } = filterArea;
  const { height, width } = browser;
  return {
    startDate,
    endDate,
    filterType,
    filterVehicle,
    identifier,
    geo,
    lngLats,
    height,
    width,
  };
};

export default connect(mapStateToProps, {
  fetchCrashStatsData,
  fetchCrashesDateRange,
  fetchCrashesMaxDate,
  fetchCrashesYearRange,
  fetchContributingFactors,
  openModal,
})(App);
