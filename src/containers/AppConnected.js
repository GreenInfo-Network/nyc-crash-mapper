import { connect } from 'react-redux';

import { dateStringFormatModel } from '../constants/api';
import { openModal } from '../actions/';
import App from '../components/App';

const mapStateToProps = ({ dateRange, filterType, filterArea }) => {
  const { startDate, endDate } = dateRange;
  const { identifier, geo, lngLats } = filterArea;
  return {
    startDate: startDate.format(dateStringFormatModel),
    endDate: endDate.format(dateStringFormatModel),
    filterType,
    identifier,
    geo,
    lngLats,
  };
};

export default connect(mapStateToProps, { openModal })(App);
