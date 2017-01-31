import {
  FILTER_BY_AREA_TYPE,
  FILTER_BY_AREA_IDENTIFIER,
  FILTER_BY_AREA_CUSTOM,
} from '../constants/action_types';

const defaultState = {
  area: 'Citywide',
  identifier: undefined,
  latLons: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FILTER_BY_AREA_TYPE:
      return {
        ...state,
        geo: action.geo,
      };

    case FILTER_BY_AREA_IDENTIFIER:
      return {
        ...state,
        identifier: action.identifier,
      };

    case FILTER_BY_AREA_CUSTOM:
      return {
        ...state,
        latLons: action.latLons
      };

    default:
      return state;
  }
};
