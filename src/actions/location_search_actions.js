import fetch from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';
import {
  LOCATION_SEARCH_REQUEST,
  LOCATION_SEARCH_SUCCESS,
  LOCATION_SEARCH_ERROR,
  CLEAR_SEARCH_SUGGESTIONS,
  UPDATE_AUTOSUGGEST_VALUE,
  LOCATION_SEARCH_SELECT
} from '../constants/action_types';

polyfill();

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

export const fetchSearchResults = () => {
  const url = 'https://geosearch.planninglabs.nyc/v1/autocomplete?text=';
  return (dispatch, getState) => {
    const { autosuggestValue } = getState().search;
    dispatch(requestSearchResults());
    return fetch(`${url}${autosuggestValue}`)
      .then((res) => {
        // fetch has an annoying way of handling http errors...
        if (!res.ok) {
          throw Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then((json) => {
        const payload = json.features;
        return dispatch(receiveSearchResults(payload));
      })
      .catch(error => dispatch(receiveSearchError(error)));
  };
};

export const updateAutosuggestValue = value => ({
  type: UPDATE_AUTOSUGGEST_VALUE,
  value
});

export const selectSearchResult = feature => ({
  type: LOCATION_SEARCH_SELECT,
  feature
});

export const clearSearchSuggestions = () => ({
  type: CLEAR_SEARCH_SUGGESTIONS
});
