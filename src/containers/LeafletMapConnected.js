import { connect } from 'react-redux';

import {
  filterByAreaIdentifier,
  filterByAreaCustom,
  fetchGeoPolygons
} from '../actions/';
import LeafletMap from '../components/LeafletMap/';

const mapStateToProps = (
  { filterDate, filterType, filterLocation, filterArea, search },
  ownProps
) => {
  const { startDate, endDate } = filterDate;
  const { location: { query } } = ownProps;
  const { lat, lng, zoom } = query;
  const { geo, geojson, identifier, lngLats, drawEnabeled } = filterArea;
  const { filterCoords } = filterLocation;
  const { selectedFeature } = search;
  return {
    zoom: zoom ? Number(zoom) : undefined,
    lat: lat ? Number(lat) : undefined,
    lng: lng ? Number(lng) : undefined,
    startDate,
    endDate,
    filterType,
    filterCoords,
    drawEnabeled,
    geo,
    geojson,
    identifier,
    lngLats,
    searchResult: selectedFeature
  };
};

export default connect(mapStateToProps, {
  filterByAreaIdentifier,
  filterByAreaCustom,
  fetchGeoPolygons
})(LeafletMap);
