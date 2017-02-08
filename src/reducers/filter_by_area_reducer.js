import {
  FILTER_BY_AREA_TYPE,
  FILTER_BY_AREA_IDENTIFIER,
  FILTER_BY_AREA_CUSTOM,
  TOGGLE_CUSTOM_AREA_DRAW,
} from '../constants/action_types';

const defaultState = {
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

    default:
      return state;
  }
};
