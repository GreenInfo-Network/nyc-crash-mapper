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

  // parse query params, with compatibility hack issue 97 to accept Chart View identifier
  // which is really the full string name with a borough prefix
  Object.keys(q).forEach((key) => {
    const decoded = decodeURIComponent(q[key]);
    if (isJsonString(decoded)) {
      p[key] = JSON.parse(decoded);
    } else {
      p[key] = decoded;
    }
  });
  if (p.identifier && typeof p.identifier === 'string') {
    if (p.identifier.indexOf(',') !== -1) {
      p.identifier = p.identifier.split(',')[1];
    }
    p.identifier = p.identifier.trim();

    const identifierEndsInNumber = p.identifier.match(/(\d+)$/);
    if (identifierEndsInNumber) {
      p.identifier = identifierEndsInNumber[1];
    }
  }

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
    filterVehicle: {
      vehicle: {
        car: isBool(p.vcar) ? p.vcar : true,
        truck: isBool(p.vtruck) ? p.vtruck : true,
        motorcycle: isBool(p.vmotorcycle) ? p.vmotorcycle : true,
        bicycle: isBool(p.vbicycle) ? p.vbicycle : true,
        suv: isBool(p.vsuv) ? p.vsuv : true,
        busvan: isBool(p.vbusvan) ? p.vbusvan : true,
        scooter: isBool(p.vscooter) ? p.vscooter : true,
        other: isBool(p.vother) ? p.vother : true,
      },
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
// also used in App.js to determine whether to update URL params
// @param {object} curProps; the component's this.props
// @param {object} nextProps; the component's nextProps in componentWillReceiveProps
export const crashDataChanged = (curProps, nextProps) => {
  const { endDate, startDate, filterType, identifier, geo, lngLats } = nextProps;
  const { injury, fatality, noInjuryFatality } = filterType;
  const { filterVehicle } = nextProps;

  if (!startDate.isSame(curProps.startDate) ||
      !endDate.isSame(curProps.endDate) ||
      !isEqual(injury, curProps.filterType.injury) ||
      !isEqual(fatality, curProps.filterType.fatality) ||
      noInjuryFatality !== curProps.filterType.noInjuryFatality ||
      !isEqual(filterVehicle.vehicle, curProps.filterVehicle.vehicle) ||
      (geo === 'citywide' && curProps.geo !== 'citywide') ||
      (identifier && identifier !== curProps.identifier) ||
      (lngLats && lngLats.length && !isEqual(lngLats, curProps.lngLats))) {
    return true;
  }
  return false;
};
