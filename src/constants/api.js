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
  const p = {};

  const isJsonString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  Object.keys(q).forEach((key) => {
    const decoded = decodeURIComponent(q[key]);
    if (isJsonString(decoded)) {
      p[key] = JSON.parse(decoded);
    } else if (decoded.indexOf('-') !== -1 && moment(decoded).isValid()) {
      p[key] = momentize(decoded);
    } else {
      p[key] = decoded;
    }
  });

  return {
    dateRange: {
      startDate: p.startDate || momentize('2016-07-01'),
      endDate: p.endDate || momentize('2016-07-31'),
    },
    filterArea: {
      geo: p.geo || 'Citywide',
      identifier: p.identifier || undefined,
      lngLats: p.lngLats || []
    },
    filterType: {
      injury: {
        cyclist: p.cinj || false,
        motorist: p.minj || false,
        pedestrian: p.pinj || false,
      },
      fatality: {
        cyclist: p.cfat || false,
        motorist: p.mfat || false,
        pedestrian: p.pfat || false,
      },
      noInjuryFatality: p.noInjFat || false,
    },
    filterContributingFactor: p.contrFactor || 'ALL',
    modal: {
      showModal: false,
      modalType: '',
    }
  };
};

// configures Carto crashes map layer's SQL
export const configureLayerSource = (sql) => {
  cartoLayerSource.sublayers[0].sql = sql;
  return cartoLayerSource;
};

// Should the component fetch new crash data?
// @param {object} curProps; the component's this.props
// @param {object} nextProps; the component's nextProps in componentWillReceiveProps
export const crashDataChanged = (curProps, nextProps) => {
  const { endDate, startDate, filterType, identifier, geo, lngLats } = nextProps;
  const { injury, fatality, noInjuryFatality } = filterType;
  if (startDate !== curProps.startDate ||
      endDate !== curProps.endDate ||
      !isEqual(injury, curProps.filterType.injury) ||
      !isEqual(fatality, curProps.filterType.fatality) ||
      noInjuryFatality !== curProps.filterType.noInjuryFatality ||
      (geo === 'Citywide' && curProps.geo !== 'Citywide') ||
      (identifier && identifier !== curProps.identifier) ||
      (lngLats && lngLats.length && !isEqual(lngLats, curProps.lngLats))) {
    return true;
  }
  return false;
};
