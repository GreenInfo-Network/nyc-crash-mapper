import { connect } from 'react-redux';

import { dateStringFormatModel } from '../constants/api';
import LeafletMap from '../components/LeafletMap/';

const mapStateToProps = ({ dateRange, filterType }, ownProps) => {
  const { startDate, endDate } = dateRange;
  const { location: { query } } = ownProps;
  const { lat, lng, zoom } = query;
  return {
    zoom: zoom ? Number(zoom) : undefined,
    lat: lat ? Number(lat) : undefined,
    lng: lng ? Number(lng) : undefined,
    startDate: startDate.format(dateStringFormatModel),
    endDate: endDate.format(dateStringFormatModel),
    filterType,
  };
};

export default connect(mapStateToProps, {})(LeafletMap);
