import { connect } from 'react-redux';

import { filterByAreaIdentifier, filterByAreaCustom } from '../actions/';
import LeafletMap from '../components/LeafletMap/';

const mapStateToProps = ({ filterDate, filterType, filterArea }, ownProps) => {
  const { startDate, endDate } = filterDate;
  const { location: { query } } = ownProps;
  const { lat, lng, zoom } = query;
  const { geo, identifier, lngLats, drawEnabeled } = filterArea;
  return {
    zoom: zoom ? Number(zoom) : undefined,
    lat: lat ? Number(lat) : undefined,
    lng: lng ? Number(lng) : undefined,
    startDate,
    endDate,
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
