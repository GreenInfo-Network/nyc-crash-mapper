import {
  FILTER_BY_AREA_TYPE,
  FILTER_BY_AREA_IDENTIFIER,
  FILTER_BY_AREA_CUSTOM,
  TOGGLE_CUSTOM_AREA_DRAW,
  GEO_POLYGONS_REQUEST,
  GEO_POLYGONS_SUCCESS,
  GEO_POLYGONS_ERROR,
} from '../constants/action_types';

const defaultState = {
  _isFetching: false,
  geo: 'Citywide',
  identifier: undefined,
  latLons: [],
  drawEnabeled: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FILTER_BY_AREA_TYPE:
      return {
        ...state,
        geo: action.geo,
        identifier: undefined,
        lngLats: [],
        drawEnabeled: action.geo === 'Custom',
      };

    case FILTER_BY_AREA_IDENTIFIER:
      return {
        ...state,
        identifier: action.identifier,
      };

    case FILTER_BY_AREA_CUSTOM:
      return {
        ...state,
        lngLats: action.lngLats,
        drawEnabeled: false,
      };

    case TOGGLE_CUSTOM_AREA_DRAW:
      return {
        ...state,
        drawEnabeled: !state.drawEnabeled,
      };

    case GEO_POLYGONS_REQUEST:
      return {
        ...state,
        _isFetching: true,
      };

    case GEO_POLYGONS_SUCCESS:
      return {
        ...state,
        _isFetching: false,
        geojson: action.geojson,
      };

    case GEO_POLYGONS_ERROR:
      return {
        ...state,
        _isFetching: false,
        error: action.error,
      };

    default:
      return state;
  }
};
