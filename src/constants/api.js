import moment from 'moment';
import queryString from 'query-string';
import sls from 'single-line-string';

import { cartoLayerSource, cartoTables } from './app_config';

const { nyc_crashes } = cartoTables;
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

// Generates the SQL WHERE clause for "Filter by Type"
// @param {object} the store.filterType piece of state
export const filterByTypeWhereClause = (filterType) => {
  const { injury, fatality, noInjuryFatality } = filterType;
  let whereClause = '';

  const mapTypes = (personTypes, harmType) =>
    Object.keys(personTypes).filter((type) => {
      const val = personTypes[type];
      if (val) return type;
      return false;
    })
    .map((type) => {
      const hurtTerm = harmType === 'injury' ? 'injured' : 'killed';
      return ` number_of_${type}_${hurtTerm} > 0 `;
    })
    .join('OR');

  const typesInjuredMapped = mapTypes(injury, 'injury');
  const typesKilledMapped = mapTypes(fatality, 'fatality');

  if (typesInjuredMapped.length > 0 && typesKilledMapped.length > 0) {
    whereClause += `AND (${typesInjuredMapped} OR ${typesKilledMapped})`;
  } else if (typesInjuredMapped.length > 0) {
    whereClause += `AND (${typesInjuredMapped})`;
  } else if (typesKilledMapped.length > 0) {
    whereClause += `AND (${typesKilledMapped})`;
  } else if (noInjuryFatality) {
    whereClause += sls`AND
      number_of_cyclist_injured = 0 AND
      number_of_cyclist_killed = 0 AND
      number_of_motorist_injured = 0 AND
      number_of_motorist_killed = 0 AND
      number_of_pedestrian_injured = 0 AND
      number_of_pedestrian_killed = 0 AND
      number_of_persons_injured = 0 AND
      number_of_persons_killed = 0
    `;
  }

  return whereClause;
};

// Generates the SQL query for the Carto layer based on filter params & app element
// @param {object} params: key values associated with filters derived from app state
// @param {string} startDate: min date; required
// @param {string} endDate: max date; required
// @param {string} harm: crash type, one of 'ALL', 'cyclist', 'motorist', 'ped'
// @param {string} persona: crash type, of of 'ALL', 'fatality', 'injury', 'no inj/fat'
export const configureMapSQL = (params) => {
  const { startDate, endDate, filterType } = params;

  return sls`
    SELECT
      c.the_geom,
      c.the_geom_webmercator,
      c.on_street_name,
      c.cross_street_name,
      COUNT(c.cartodb_id) as total_crashes,
      SUM(c.number_of_cyclist_injured) as cyclist_injured,
      SUM(c.number_of_cyclist_killed) as cyclist_killed,
      SUM(c.number_of_motorist_injured) as motorist_injured,
      SUM(c.number_of_motorist_killed) as motorist_killed,
      SUM(c.number_of_pedestrian_injured) as pedestrian_injured,
      SUM(c.number_of_pedestrian_killed) as pedestrian_killed,
      SUM(c.number_of_persons_injured) as persons_injured,
      SUM(c.number_of_persons_killed) as persons_killed,
      SUM(CASE WHEN c.number_of_persons_injured > 0 THEN 1 ELSE 0 END) AS total_crashes_with_injury,
      SUM(CASE WHEN c.number_of_persons_killed > 0 THEN 1 ELSE 0 END) AS total_crashes_with_death
    FROM
      ${nyc_crashes} c
    WHERE
      (date_val <= date '${endDate}')
    AND
      (date_val >= date '${startDate}')
    ${filterByTypeWhereClause(filterType)}
    AND
      c.the_geom IS NOT NULL
    GROUP BY
      c.the_geom, c.the_geom_webmercator, c.on_street_name, c.cross_street_name
  `;
};

export const configureStatsSQL = (params) => {
  const { startDate, endDate, filterType } = params;

  return sls`
    SELECT
      COUNT(c.cartodb_id) as total_crashes,
      SUM(CASE WHEN c.number_of_persons_injured > 0 THEN 1 ELSE 0 END) AS total_crashes_with_injury,
      SUM(CASE WHEN c.number_of_persons_killed > 0 THEN 1 ELSE 0 END) AS total_crashes_with_death,
      SUM(c.number_of_cyclist_injured) as cyclist_injured,
      SUM(c.number_of_cyclist_killed) as cyclist_killed,
      SUM(c.number_of_motorist_injured) as motorist_injured,
      SUM(c.number_of_motorist_killed) as motorist_killed,
      SUM(c.number_of_pedestrian_injured) as pedestrian_injured,
      SUM(c.number_of_pedestrian_killed) as pedestrian_killed,
      SUM(c.number_of_persons_injured) as persons_injured,
      SUM(c.number_of_persons_killed) as persons_killed
    FROM
      ${nyc_crashes} c
    WHERE
      (date_val <= date '${endDate}')
    AND
      (date_val >= date '${startDate}')
    ${filterByTypeWhereClause({ filterType })}
  `;
};

export const configureFactorsSQL = (params) => {
  const { startDate, endDate, filterType } = params;

  return sls`
    WITH all_factors as (
      SELECT
        c.contributing_factor_vehicle_1 as factor
      FROM
        ${nyc_crashes} c
      WHERE
        (date_val <= date '${endDate}')
      AND
        (date_val >= date '${startDate}')
      ${filterByTypeWhereClause({ filterType })}
      UNION ALL
      SELECT
        c.contributing_factor_vehicle_2 as factor
      FROM
        ${nyc_crashes} c
      WHERE
        (date_val <= date '${endDate}')
      AND
        (date_val >= date '${startDate}')
      ${filterByTypeWhereClause({ filterType })}
      UNION ALL
      SELECT
        c.contributing_factor_vehicle_3 as factor
      FROM
        ${nyc_crashes} c
      WHERE
        (date_val <= date '${endDate}')
      AND
        (date_val >= date '${startDate}')
      ${filterByTypeWhereClause({ filterType })}
      UNION ALL
      SELECT
        c.contributing_factor_vehicle_4 as factor
      FROM
        ${nyc_crashes} c
      WHERE
        (date_val <= date '${endDate}')
      AND
        (date_val >= date '${startDate}')
      ${filterByTypeWhereClause({ filterType })}
      UNION ALL
      SELECT
        c.contributing_factor_vehicle_5 as factor
      FROM
        ${nyc_crashes} c
      WHERE
        (date_val <= date '${endDate}')
      AND
        (date_val >= date '${startDate}')
      ${filterByTypeWhereClause({ filterType })}
      )
    SELECT
     COUNT(af.factor) as count_factor,
     af.factor
    FROM
      all_factors af
    GROUP BY
      af.factor
    ORDER BY
      count_factor desc
  `;
};
