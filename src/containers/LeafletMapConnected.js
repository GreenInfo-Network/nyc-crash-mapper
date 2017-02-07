import { connect } from 'react-redux';

import { dateStringFormatModel } from '../constants/api';
import { filterByAreaIdentifier, filterByAreaCustom } from '../actions/';
import LeafletMap from '../components/LeafletMap/';

const mapStateToProps = ({ dateRange, filterType, filterArea }, ownProps) => {
  const { startDate, endDate } = dateRange;
  const { location: { query } } = ownProps;
  const { lat, lng, zoom } = query;
  const { geo, identifier, lngLats, drawEnabeled } = filterArea;
  return {
    zoom: zoom ? Number(zoom) : undefined,
    lat: lat ? Number(lat) : undefined,
    lng: lng ? Number(lng) : undefined,
    startDate: startDate.format(dateStringFormatModel),
    endDate: endDate.format(dateStringFormatModel),
    filterType,
    drawEnabeled,
    geo,
    identifier,
    lngLats,
  };
};

export default connect(mapStateToProps, {
  filterByAreaIdentifier,
  filterByAreaCustom,
})(LeafletMap);
