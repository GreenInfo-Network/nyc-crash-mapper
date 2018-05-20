import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch';
import { cartoSQLQuery, geocodingK } from '../constants/app_config';
import * as actions from '../constants/action_types';
import {
  configureStatsSQL,
  configureFactorsSQL,
  crashesYearRangeSQL,
  minMaxDateRange,
  crashesMaxDate,
  filterByAreaSQL } from '../constants/sql_queries';

polyfill();

// fetch() has an annoying way of handling http errors, so make sure to check for them
function maybeHandleHTTPError (response) {
  if (!response.ok) {
    throw Error(response.statusText);
  } else {
    return response;
  }
}

const requestCrashStatsData = () => ({
  type: actions.CRASHES_ALL_REQUEST
});

const receiveCrashStatsData = json => ({
  type: actions.CRASHES_ALL_SUCCESS,
  json
});

const receiveCrashStatsError = error => ({
  type: actions.CRASHES_ALL_ERROR,
  error
});

export const fetchCrashStatsData = (params) => {
  const query = encodeURIComponent(configureStatsSQL(params));
  const url = cartoSQLQuery(query);
  return (dispatch) => {
    dispatch(requestCrashStatsData());
    return fetch(url)
      .then(maybeHandleHTTPError)
      .then(res => res.json())
      .then(json => dispatch(receiveCrashStatsData(json.rows[0])))
      .catch(error => dispatch(receiveCrashStatsError(error)));
  };
};

const requestContributingFactors = () => ({
  type: actions.CONTRIBUTING_FACTORS_REQUEST
});

const receiveContributingFactors = json => ({
  type: actions.CONTRIBUTING_FACTORS_SUCCESS,
  json
});

const receiveContributingFactorsError = error => ({
  type: actions.CONTRIBUTING_FACTORS_ERROR,
  error
});

export const fetchContributingFactors = (params) => {
  const query = encodeURIComponent(configureFactorsSQL(params));
  const url = cartoSQLQuery(query);
  return (dispatch) => {
    dispatch(requestContributingFactors());
    return fetch(url)
      .then(maybeHandleHTTPError)
      .then(res => res.json())
      .then(json => dispatch(receiveContributingFactors(json.rows)))
      .catch(error => dispatch(receiveContributingFactorsError(error)));
  };
};

const requestCrashesYearRange = () => ({
  type: actions.CRASHES_YEAR_RANGE_REQUEST
});

const receiveCrashesYearRange = json => ({
  type: actions.CRASHES_YEAR_RANGE_SUCCESS,
  json
});

const receiveCrashesYearRangeError = error => ({
  type: actions.CRASHES_YEAR_RANGE_ERROR,
  error
});

export const fetchCrashesYearRange = () => {
  const query = encodeURIComponent(crashesYearRangeSQL());
  const url = cartoSQLQuery(query);
  return (dispatch) => {
    dispatch(requestCrashesYearRange());
    return fetch(url)
      .then(maybeHandleHTTPError)
      .then(res => res.json())
      .then(json => dispatch(receiveCrashesYearRange(json.rows)))
      .catch(error => dispatch(receiveCrashesYearRangeError(error)));
  };
};

const requestCrashesDateRange = () => ({
  type: actions.CRASHES_DATE_RANGE_REQUEST
});

const receiveCrashesDateRange = json => ({
  type: actions.CRASHES_DATE_RANGE_SUCCESS,
  json
});

const receiveCrashesDateRangeError = error => ({
  type: actions.CRASHES_DATE_RANGE_ERROR,
  error
});

export const fetchCrashesDateRange = () => {
  const query = encodeURIComponent(minMaxDateRange());
  const url = cartoSQLQuery(query);
  return (dispatch) => {
    dispatch(requestCrashesDateRange());
    return fetch(url)
      .then(maybeHandleHTTPError)
      .then(res => res.json())
      .then(json => dispatch(receiveCrashesDateRange(json.rows)))
      .catch(error => dispatch(receiveCrashesDateRangeError(error)));
  };
};

const requestCrashesMaxDate = () => ({
  type: actions.CRASHES_MAX_DATE_REQUEST
});

const receiveCrashesMaxDate = json => ({
  type: actions.CRASHES_MAX_DATE_RESPONSE,
  json
});

const receiveCrashesMaxDateError = error => ({
  type: actions.CRASHES_MAX_DATE_ERROR,
  error
});

export const fetchCrashesMaxDate = () => {
  const query = encodeURIComponent(crashesMaxDate());
  const url = cartoSQLQuery(query);
  return (dispatch) => {
    dispatch(requestCrashesMaxDate());
    return fetch(url)
      .then(maybeHandleHTTPError)
      .then(res => res.json())
      .then(json => dispatch(receiveCrashesMaxDate(json.rows)))
      .catch(error => dispatch(receiveCrashesMaxDateError(error)));
  };
};

const requestGeoPolygons = () => ({
  type: actions.GEO_POLYGONS_REQUEST,
});

const receiveGeoPolygons = geojson => ({
  type: actions.GEO_POLYGONS_SUCCESS,
  geojson,
});

const receiveGeoPolygonsError = error => ({
  type: actions.GEO_POLYGONS_ERROR,
  error,
});

export const fetchGeoPolygons = (geo) => {
  const query = encodeURIComponent(filterByAreaSQL[geo]);
  const url = cartoSQLQuery(query, 'geojson');
  return (dispatch) => {
    dispatch(requestGeoPolygons());
    return fetch(url)
      .then(maybeHandleHTTPError)
      .then(res => res.json())
      .then((json) => {
        // tack on the geography name so that it may be diff'd in LeafletMap propTypes
        json.geoName = geo;
        return dispatch(receiveGeoPolygons(json));
      })
      .catch(error => dispatch(receiveGeoPolygonsError(error)));
  };
};


// address geocode
// we are about to make a GET request to geocode a location
const locationGeocodeRequest = searchTerm => ({
  type: actions.LOCATION_GEOCODE_REQUEST,
  searchTerm
});

// we have JSON data representing the geocoded location
const locationGeocodeSuccess = json => ({
  type: actions.LOCATION_GEOCODE_SUCCESS,
  json
});

// we encountered an error geocoding the location
export const locationGeocodeError = error => ({
  type: actions.LOCATION_GEOCODE_ERROR,
  error
});

/*
 * Redux Thunk action creator to fetch geocoded JSON for a given location / address
 * @param {string} location: A URI encoded string representing an address,
 *   e.g. "1600+Amphitheatre+Parkway,+Mountain+View,+CA"
*/
export const fetchLocationGeocode = (searchTerm) => {
  const searchTermEncoded = encodeURIComponent(searchTerm);
  const viewportBias = encodeURIComponent('40.485604,-74.284058|40.935303,-73.707275');
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchTermEncoded}&bounds=${viewportBias}&key=${geocodingK}`;

  return (dispatch) => {
    dispatch(locationGeocodeRequest(searchTerm));
    return fetch(url)
      .then(maybeHandleHTTPError)
      .then(res => res.json())
      .then((json) => {
        const { results, status } = json;
        // catch a non-successful geocode result that was returned in the response
        if (!results || !results.length || status !== 'OK') {
          dispatch(locationGeocodeError('Address not found, please try again.'));
        } else {
          dispatch(locationGeocodeSuccess(results[0]));
        }
      })
      .catch(error => dispatch(locationGeocodeError(error)));
  };
};
