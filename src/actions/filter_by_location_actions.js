import {
  CLEAR_LOCATION_GEOCODE,
  FILTER_BY_LOCATION,
} from '../constants/action_types';

export const clearLocationGeocode = () => ({
  type: CLEAR_LOCATION_GEOCODE,
});

export const filterByLocation = latLon => ({
  type: FILTER_BY_LOCATION,
  latLon
});

export default clearLocationGeocode;
