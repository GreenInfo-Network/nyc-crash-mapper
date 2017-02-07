import { connect } from 'react-redux';

import { dateStringFormatModel } from '../constants/api';
import { openModal } from '../actions/';
import App from '../components/App';

const mapStateToProps = ({ browser, dateRange, filterType, filterArea }) => {
  const { startDate, endDate } = dateRange;
  const { identifier, geo, lngLats } = filterArea;
  const { width } = browser;
  return {
    startDate: startDate.format(dateStringFormatModel),
    endDate: endDate.format(dateStringFormatModel),
    filterType,
    identifier,
    geo,
    lngLats,
    width,
  };
};

export default connect(mapStateToProps, { openModal })(App);
