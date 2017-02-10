import moment from 'moment';
import queryString from 'query-string';
import isEqual from 'lodash/isEqual';

import { cartoLayerSource, defaultYearMonth } from './app_config';

export const dateStringFormatModel = 'YYYY-MM';
export const dateStringFormatView = 'MMM, YYYY';

export const momentize = dateString => moment(dateString, dateStringFormatModel, true);

// Names for Filter by Boundary
export const geos = ['Citywide', 'Borough', 'Community Board', 'City Council District',
  'Neighborhood (NTA)', 'NYPD Precinct', 'Zipcode (ZCTA)', 'Custom'];

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

  const isBool = (val) => {
    if (val && typeof val === 'boolean') {
      return val;
    }
    return false;
  };

  const isValidMomentObj = (dateString) => {
    const m = dateString ? momentize(dateString) : undefined;
    if (m && m.isValid()) {
      return m;
    }
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
      geo: isValidGeo(p.geo),
      identifier: p.identifier || undefined,
      lngLats: p.lngLats || [],
      drawEnabeled: false,
    },
    filterType: {
      injury: {
        cyclist: isBool(p.cinj),
        motorist: isBool(p.minj),
        pedestrian: isBool(p.pinj),
      },
      fatality: {
        cyclist: isBool(p.cfat),
        motorist: isBool(p.mfat),
        pedestrian: isBool(p.pfat),
      },
      noInjuryFatality: isBool(p.noInjFat),
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
      (geo === 'Citywide' && curProps.geo !== 'Citywide') ||
      (identifier && identifier !== curProps.identifier) ||
      (lngLats && lngLats.length && !isEqual(lngLats, curProps.lngLats))) {
    return true;
  }
  return false;
};
