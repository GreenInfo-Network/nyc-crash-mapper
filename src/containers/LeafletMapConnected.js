import { connect } from 'react-redux';

import { dateStringFormatModel } from '../constants/api';
import LeafletMap from '../components/LeafletMap/';

const mapStateToProps = ({ dateRange: { startDate, endDate } }) => ({
  startDate: startDate.format(dateStringFormatModel),
  endDate: endDate.format(dateStringFormatModel),
});

export default connect(mapStateToProps, {})(LeafletMap);
