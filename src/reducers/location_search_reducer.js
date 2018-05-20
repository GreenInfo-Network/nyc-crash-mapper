import {
  LOCATION_SEARCH_REQUEST,
  LOCATION_SEARCH_SUCCESS,
  LOCATION_SEARCH_ERROR,
  CLEAR_SEARCH_SUGGESTIONS,
  UPDATE_AUTOSUGGEST_VALUE,
  LOCATION_SEARCH_SELECT,
  RESET_LOCATION_SEARCH,
} from '../constants/action_types';

const defaultState = {
  error: null,
  isFetching: false,
  suggestions: [],
  autosuggestValue: '',
  selectedFeature: null,
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

    case LOCATION_SEARCH_SELECT:
      return {
        ...state,
        selectedFeature: action.feature
      };

    case CLEAR_SEARCH_SUGGESTIONS:
      return {
        ...state,
        suggestions: []
      };

    case RESET_LOCATION_SEARCH:
      return {
        ...defaultState
      };

    default:
      return state;
  }
}
