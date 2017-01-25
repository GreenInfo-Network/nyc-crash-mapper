import { FILTER_BY_CONTRIBUTING_FACTOR } from '../constants/action_types';

export default (state = 'ALL', action) => {
  switch (action.type) {
    case FILTER_BY_CONTRIBUTING_FACTOR:
      return action.factor;
    default:
      return state;
  }
};
