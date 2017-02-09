import { connect } from 'react-redux';

import { openModal } from '../actions/';
import App from '../components/App';

const mapStateToProps = ({ browser, dateRange, filterType, filterArea }) => {
  const { startDate, endDate } = dateRange;
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

export default connect(mapStateToProps, { openModal })(App);
