import {
  CRASHES_DATE_RANGE_REQUEST,
  CRASHES_DATE_RANGE_SUCCESS,
  CRASHES_DATE_RANGE_ERROR,
} from '../constants/action_types';

import { momentize } from '../constants/api';

export default (state = {}, action) => {
  switch (action.type) {
    case CRASHES_DATE_RANGE_REQUEST:
      return {
        ...state,
        _fetchingCrashesDateRange: true,
      };

    case CRASHES_DATE_RANGE_SUCCESS:
      return {
        ...state,
        _fetchingCrashesDateRange: false,
        minDate: momentize(action.json[0].min),
        maxDate: momentize(action.json[0].max),
      };

    case CRASHES_DATE_RANGE_ERROR:
      return {
        ...state,
        _fetchingCrashesDateRange: false,
        error: action.error,
      };

    default:
      return state;
  }
};
