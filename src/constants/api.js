// @flow
import moment from 'moment';
import queryString from 'query-string';
import isEqual from 'lodash/isEqual';

import { cartoLayerSource } from './app_config';

export const dateStringFormatModel: string = 'YYYY-MM';
export const dateStringFormatView: string = 'MMM, YYYY';

export const momentize = (dateString: string): Object =>
  moment(dateString, dateStringFormatModel, true);

// Names for Filter by Boundary
export const geos: Array<string> = ['Citywide', 'Borough', 'Community Board', 'City Council District',
  'Neighborhood (NTA)', 'NYPD Precinct', 'Zipcode (ZCTA)', 'Custom'];

// creates default app state using any available params from window.location.hash
export const makeDefaultState = (): Object => {
  const hash: string = window.location.hash;
  const qString: string = hash.substring(3, hash.length);
  const q: Object = queryString.parse(qString);
  const p: Object = {};

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
    const m2 = moment();
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
export const configureLayerSource = (sql: string): Object => {
  cartoLayerSource.sublayers[0].sql = sql;
  return cartoLayerSource;
};

// Should the component fetch new crash data?
// @param {object} curProps; the component's this.props
// @param {object} nextProps; the component's nextProps in componentWillReceiveProps
export const crashDataChanged = (curProps: Object, nextProps: Object): boolean => {
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
