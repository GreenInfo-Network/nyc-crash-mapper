import { connect } from 'react-redux';

import { filterByAreaIdentifier, filterByAreaCustom, fetchGeoPolygons } from '../actions/';
import LeafletMap from '../components/LeafletMap/';

const mapStateToProps = ({ filterDate, filterType, filterArea, geocoding }, ownProps) => {
  const { startDate, endDate } = filterDate;
  const { location: { query } } = ownProps;
  const { lat, lng, zoom } = query;
  const { geo, geojson, identifier, lngLats, drawEnabeled } = filterArea;
  const { result } = geocoding;
  return {
    zoom: zoom ? Number(zoom) : undefined,
    lat: lat ? Number(lat) : undefined,
    lng: lng ? Number(lng) : undefined,
    startDate,
    endDate,
    filterType,
    drawEnabeled,
    geo,
    geojson,
    identifier,
    lngLats,
    searchResult: result,
  };
};

export default connect(mapStateToProps, {
  filterByAreaIdentifier,
  filterByAreaCustom,
  fetchGeoPolygons,
})(LeafletMap);
