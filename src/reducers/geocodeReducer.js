import {
  LOCATION_GEOCODE_REQUEST,
  LOCATION_GEOCODE_SUCCESS,
  LOCATION_GEOCODE_ERROR,
} from '../constants/action_types';

const defaultState = {
  isFetching: false,
  searchTerm: '',
  result: null,
  error: null
};

const parseGeocodeResult = (result) => {
  const { formatted_address, geometry } = result;
  const addressLabel = formatted_address.replace(/,\s+(USA|Canada|Mexico)\s*$/, '');

  return {
    addressFormatted: addressLabel,
    coordinates: [geometry.location.lat, geometry.location.lng],
  };
};

/*
 * Geocoding Reducer
 * @param {object} state: default reducer state
 * @param {object} action: redux action creator
*/
export default (state = defaultState, action) => {
  switch (action.type) {
    case LOCATION_GEOCODE_REQUEST:
      return {
        ...state,
        isFetching: true,
        searchTerm: action.searchTerm,
        result: null
      };

    case LOCATION_GEOCODE_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        result: parseGeocodeResult(action.json)
      };

    case LOCATION_GEOCODE_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    default:
      return state;
  }
};
