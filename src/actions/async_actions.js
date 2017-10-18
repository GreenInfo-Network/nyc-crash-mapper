import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch';
import { cartoSQLQuery } from '../constants/app_config';
import * as actions from '../constants/action_types';
import {
  configureStatsSQL,
  configureFactorsSQL,
  crashesYearRangeSQL,
  minMaxDateRange,
  crashesMaxDate,
  filterByAreaSQL } from '../constants/sql_queries';

polyfill();

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
      .then(res => res.json())
      .then(json => dispatch(receiveGeoPolygons(json)))
      .catch(error => dispatch(receiveGeoPolygonsError(error)));
  };
};
