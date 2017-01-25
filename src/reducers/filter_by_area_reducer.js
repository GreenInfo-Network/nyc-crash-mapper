import { FILTER_BY_AREA } from '../constants/action_types';

const defaultState = {
  area: '',
  identifier: undefined,
  latLons: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FILTER_BY_AREA:
      return {
        ...state,
        area: action.area,
        latLons: action.latLons
      };

    default:
      return state;
  }
};
