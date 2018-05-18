import {
  LOCATION_SEARCH_REQUEST,
  LOCATION_SEARCH_SUCCESS,
  LOCATION_SEARCH_ERROR,
  CLEAR_LOCATION_SEARCH,
  UPDATE_AUTOSUGGEST_VALUE
} from '../constants/action_types';

const defaultState = {
  error: null,
  isFetching: false,
  suggestions: [],
  autosuggestValue: ''
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case LOCATION_SEARCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case LOCATION_SEARCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        suggestions: action.payload
      };

    case LOCATION_SEARCH_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    case UPDATE_AUTOSUGGEST_VALUE:
      return {
        ...state,
        autosuggestValue: action.value
      };

    case CLEAR_LOCATION_SEARCH:
      return {
        ...state,
        suggestions: []
      };

    default:
      return state;
  }
}
