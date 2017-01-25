import {
  CRASHES_ALL_REQUEST,
  CRASHES_ALL_SUCCESS,
  CRASHES_ALL_ERROR
} from '../constants/action_types';

export default (state = {}, action) => {
  switch (action.type) {
    case CRASHES_ALL_REQUEST:
      return {
        ...state,
        _fetchingCrashStatsTypes: true,
        typeStats: undefined
      };
    case CRASHES_ALL_SUCCESS:
      return {
        ...state,
        _fetchingCrashStatsTypes: false,
        typeStats: action.json
      };
    case CRASHES_ALL_ERROR:
      return {
        ...state,
        _fetchingCrashStatsTypes: false,
        error: action.error,
        typeStats: undefined
      };
    default:
      return state;
  }
};
