import {
  START_DATE_CHANGE,
  END_DATE_CHANGE
} from '../constants/action_types';

export default (state = {}, action) => {
  switch (action.type) {
    case START_DATE_CHANGE:
      return {
        ...state,
        startDate: action.startDate
      };
    case END_DATE_CHANGE:
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};
