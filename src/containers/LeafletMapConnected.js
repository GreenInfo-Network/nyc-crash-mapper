import { connect } from 'react-redux';

import LeafletMap from '../components/LeafletMap/';

const mapStateToProps = ({ dateRange: { startDate, endDate } }) => ({
  startDate,
  endDate
});

export default connect(mapStateToProps, {})(LeafletMap);
