import moment from 'moment';
import queryString from 'query-string';
import { cartoLayerSource } from './app_config';

export const dateStringFormatModel = 'YYYY-MM-DD';
export const dateStringFormatView = 'MMM D, YYYY';

const momentize = dateString => moment(dateString, dateStringFormatModel, true);

// creates default app state using any available params from window.location.hash
export const makeDefaultState = () => {
  const hash = window.location.hash;
  const qString = hash.substring(3, hash.length);
  const q = queryString.parse(qString);
  const startDate = q.startDate ? momentize(q.startDate) : momentize('2016-07-01');
  const endDate = q.endDate ? momentize(q.endDate) : momentize('2016-07-31');

  return {
    dateRange: {
      startDate,
      endDate,
    },
    filterArea: {
      geo: q.geo || 'Citywide',
      identifier: q.identifier || undefined,
      latLons: q.latLons || [],
    },
    filterType: {
      harm: q.harm || 'ALL',
      persona: q.persona || 'ALL',
    },
    filterContributingFactor: q.contrFactor || 'ALL'
  };
};

export const configureLayerSource = (sql) => {
  cartoLayerSource.sublayers[0].sql = sql;
  return cartoLayerSource;
};
