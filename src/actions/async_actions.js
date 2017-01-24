import { polyfill } from 'es6-promise';
polyfill();
import fetch from 'isomorphic-fetch';
import * as config from '../constants/app_config';
import * as actions from '../actions/';
import * as sql from '../constants/sql_queries';

const requestCrashData = () => ({
  type: actions.CRASHES_ALL_REQUEST
});

const recieveCrashData = (json) => ({
  type: actions.CRASHES_ALL_SUCCESS,
  json
});

const receiveCrashDataErr = (error) => ({
  type: actions.CRASHES_ALL_ERROR,
  error
});

const fetchCrashData = () => ({
  const query = sql.crashesByDate();
});

export default fetchCrashData;
