import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch';
import * as config from '../constants/app_config';
import * as actions from '../actions/';
import * as sql from '../constants/sql_queries';

polyfill();

const requestCrashStatsData = () => ({
  type: actions.CRASHES_ALL_REQUEST
});

const recieveCrashStatsData = json => ({
  type: actions.CRASHES_ALL_SUCCESS,
  json
});

const receiveCrashStatsError = error => ({
  type: actions.CRASHES_ALL_ERROR,
  error
});

const fetchCrashStatsData = ({ startDate, endDate }) => {
  const query = sql.statsDate({ startDate, endDate });
  const url = `${config.sql_endpoint}q=${query}`;
  return (dispatch) => {
    dispatch(requestCrashStatsData());
    return fetch(url)
      .then(res => res.json())
      .then(json => dispatch(recieveCrashStatsData(json.rows)))
      .catch(error => dispatch(receiveCrashStatsError(error)));
  };
};

export default fetchCrashStatsData;
