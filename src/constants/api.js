import moment from 'moment';
import queryString from 'query-string';
import isEqual from 'lodash/isEqual';

import { cartoLayerSource } from './app_config';
import { defaultState } from '../reducers/filter_by_area_reducer';

export const dateStringFormatModel = 'YYYY-MM';
export const dateStringFormatView = 'MMM, YYYY';

export const momentize = dateString => moment(dateString, dateStringFormatModel, true);

// Names for Filter by Boundary
export const geos = ['citywide', 'borough', 'community_board', 'city_council',
  'neighborhood', 'assembly', 'senate', 'nypd_precinct', 'intersection', 'custom'];

// Borough Names mapped to array index position
export const boroughs = [undefined, 'Manhattan', 'Bronx', 'Brooklyn', 'Queens', 'Staten Island'];

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

  const isBool = val => typeof val === 'boolean';

  const isValidMomentObj = (dateString) => {
    const m = dateString ? momentize(dateString) : undefined;
    if (m && m.isValid()) {
      return m;
    }
    // fallback to last month, which is more likely to have data then the current month
    // e.g. if the current date is the first week of the month,
    // then data may not exist for that month yet
    const m2 = moment().subtract(1, 'month');
    const defaultYearMonth = `${m2.year()}-${m2.format('MM')}`;
    return momentize(defaultYearMonth);
  };

  const isValidGeo = (geo) => {
    if (geos.indexOf(geo) !== -1) {
      return geo;
    }
    return geos[0];
  };

  // parse query params
  Object.keys(q).forEach((key) => {
    const decoded = decodeURIComponent(q[key]);
    if (isJsonString(decoded)) {
      p[key] = JSON.parse(decoded);
    } else {
      p[key] = decoded;
    }
  });

  return {
    filterDate: {
      startDate: isValidMomentObj(p.startDate),
      endDate: isValidMomentObj(p.endDate),
    },
    filterArea: {
      ...defaultState,
      geo: isValidGeo(p.geo),
      identifier: p.identifier || undefined,
      lngLats: p.lngLats || [],
    },
    // filterTypes default to true for all injury & fatality
    // except for noInjuryFatality which defaults to false
    filterType: {
      injury: {
        cyclist: isBool(p.cinj) ? p.cinj : true,
        motorist: isBool(p.minj) ? p.minj : true,
        pedestrian: isBool(p.pinj) ? p.pinj : true,
      },
      fatality: {
        cyclist: isBool(p.cfat) ? p.cfat : true,
        motorist: isBool(p.mfat) ? p.mfat : true,
        pedestrian: isBool(p.pfat) ? p.pfat : true,
      },
      noInjuryFatality: isBool(p.noInjFat) ? p.noInjFat : false,
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

  if (!startDate.isSame(curProps.startDate) ||
      !endDate.isSame(curProps.endDate) ||
      !isEqual(injury, curProps.filterType.injury) ||
      !isEqual(fatality, curProps.filterType.fatality) ||
      noInjuryFatality !== curProps.filterType.noInjuryFatality ||
      (geo === 'citywide' && curProps.geo !== 'citywide') ||
      (identifier && identifier !== curProps.identifier) ||
      (lngLats && lngLats.length && !isEqual(lngLats, curProps.lngLats))) {
    return true;
  }
  return false;
};
