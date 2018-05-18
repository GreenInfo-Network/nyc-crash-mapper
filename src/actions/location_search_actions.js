import {
  LOCATION_SEARCH_REQUEST,
  LOCATION_SEARCH_SUCCESS,
  LOCATION_SEARCH_ERROR,
  CLEAR_LOCATION_SEARCH,
  UPDATE_AUTOSUGGEST_VALUE
} from '../constants/action_types';

export const requestSearchResults = () => ({
  type: LOCATION_SEARCH_REQUEST
});

export const receiveSearchResults = payload => ({
  type: LOCATION_SEARCH_SUCCESS,
  payload
});

export const receiveSearchError = error => ({
  type: LOCATION_SEARCH_ERROR,
  error
});

export const updateAutosuggestValue = value => ({
  type: UPDATE_AUTOSUGGEST_VALUE,
  value
});

export const clearSearchResults = () => ({
  type: CLEAR_LOCATION_SEARCH
});
