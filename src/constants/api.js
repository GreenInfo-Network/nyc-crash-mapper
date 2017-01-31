import moment from 'moment';
import queryString from 'query-string';
import { isEqual } from 'lodash';

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
      injury: {
        cyclist: false,
        motorist: false,
        pedestrian: false,
      },
      fatality: {
        cyclist: false,
        motorist: false,
        pedestrian: false,
      },
      noInjuryFatality: false
    },
    filterContributingFactor: q.contrFactor || 'ALL'
  };
};

export const configureLayerSource = (sql) => {
  cartoLayerSource.sublayers[0].sql = sql;
  return cartoLayerSource;
};

// Should the component fetch new crash data?
// @param {object} curProps; the component's this.props
// @param {object} nextProps; the component's nextProps in componentWillReceiveProps
export const crashDataChanged = (curProps, nextProps) => {
  const { endDate, startDate, filterType, identifier, geo } = nextProps;
  const { injury, fatality, noInjuryFatality } = filterType;
  if (startDate !== curProps.startDate ||
      endDate !== curProps.endDate ||
      !isEqual(injury, curProps.filterType.injury) ||
      !isEqual(fatality, curProps.filterType.fatality) ||
      noInjuryFatality !== curProps.filterType.noInjuryFatality ||
      (geo === 'Citywide' && curProps.geo !== 'Citywide') ||
      (identifier && identifier !== curProps.identifier)) {
    return true;
  }
  return false;
};
