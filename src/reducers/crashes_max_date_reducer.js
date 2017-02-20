import moment from 'moment';
import {
  CRASHES_MAX_DATE_ERROR,
  CRASHES_MAX_DATE_REQUEST,
  CRASHES_MAX_DATE_RESPONSE
} from '../constants/action_types';

export default (state = {}, action) => {
  switch (action.type) {
    case CRASHES_MAX_DATE_REQUEST:
      return {
        ...state,
        _fetchingCrashesMaxDate: true,
      };

    case CRASHES_MAX_DATE_RESPONSE:
      return {
        ...state,
        _fetchingCrashesMaxDate: false,
        maxDate: moment(action.json[0].max_date, 'YYYY-MM-DDTHH:mm:ssZ', true)
      };

    case CRASHES_MAX_DATE_ERROR:
      return {
        ...state,
        _fetchingCrashesMaxDate: false,
        error: action.error,
      };

    default:
      return state;
  }
};
