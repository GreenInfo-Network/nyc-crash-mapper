import { connect } from 'react-redux';

import { fetchCrashStatsData,
  fetchContributingFactors,
  openModal } from '../actions/';
import App from '../components/App';

const mapStateToProps = ({ browser, filterDate, filterType, filterArea }) => {
  const { startDate, endDate } = filterDate;
  const { identifier, geo, lngLats } = filterArea;
  const { height, width } = browser;
  return {
    startDate,
    endDate,
    filterType,
    identifier,
    geo,
    lngLats,
    height,
    width,
  };
};

export default connect(mapStateToProps, {
  fetchCrashStatsData,
  fetchContributingFactors,
  openModal,
})(App);
