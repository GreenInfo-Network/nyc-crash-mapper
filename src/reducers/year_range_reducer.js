import {
  CRASHES_YEAR_RANGE_ERROR,
  CRASHES_YEAR_RANGE_REQUEST,
  CRASHES_YEAR_RANGE_SUCCESS,
} from '../constants/action_types';

export default (state = {}, action) => {
  switch (action.type) {
    case CRASHES_YEAR_RANGE_REQUEST:
      return {
        ...state,
        _fetchingCrashesYearRange: true,
      };

    case CRASHES_YEAR_RANGE_SUCCESS:
      return {
        ...state,
        _fetchingCrashesYearRange: false,
        years: action.json.map(obj => obj.year),
      };

    case CRASHES_YEAR_RANGE_ERROR:
      return {
        ...state,
        _fetchingCrashesYearRange: false,
        error: action.error
      };

    default:
      return state;
  }
};
