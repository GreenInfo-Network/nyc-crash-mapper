import {
  FILTER_BY_LOCATION,
  CLEAR_FILTER_BY_LOCATION,
} from '../constants/action_types';

const defaultState = {
  filterCoords: []
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case FILTER_BY_LOCATION:
      return {
        ...state,
        filterCoords: action.coordinates
      };

    case CLEAR_FILTER_BY_LOCATION:
      return {
        ...state,
        filterCoords: []
      };

    default:
      return state;
  }
}
