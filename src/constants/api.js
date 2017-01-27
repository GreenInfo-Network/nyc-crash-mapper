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

// determines part of the SQL WHERE clause tacked on after `WHERE date_val...`
const crashTypeWhere = (harm, persona) => {
  if (harm === 'Injury' && persona === 'ALL') {
    return 'AND number_of_persons_injured > 0 ';
  } else if (harm === 'Injury' && persona === 'Cyclist') {
    return 'AND number_of_cyclist_injured > 0';
  } else if (harm === 'Injury' && persona === 'Motorist') {
    return 'AND number_of_motorist_injured > 0';
  } else if (harm === 'Injury' && persona === 'Pedestrian') {
    return 'AND number_of_pedestrians_injured > 0';
  } else if (harm === 'Fatality' && persona === 'ALL') {
    return 'AND number_of_persons_killed > 0';
  } else if (harm === 'Fatality' && persona === 'Cyclist') {
    return 'AND number_of_cyclist_killed > 0';
  } else if (harm === 'Fatality' && persona === 'Motorist') {
    return 'AND number_of_motorist_killed > 0';
  } else if (harm === 'Fatality' && persona === 'Pedestrian') {
    return 'AND number_of_pedestrians_killed > 0';
  } else if (harm === 'No Inj/Fat' && persona === 'ALL') {
    return 'AND number_of_persons_killed = 0 AND number_of_persons_injured = 0';
  } else if (harm === 'No Inj/Fat' && persona === 'Cyclist') {
    return 'AND number_of_cyclist_killed = 0 AND number_of_cyclist_injured = 0';
  } else if (harm === 'No Inj/Fat' && persona === 'Motorist') {
    return 'AND number_of_motorist_killed = 0 AND number_of_motorist_injured = 0';
  } else if (harm === 'No Inj/Fat' && persona === 'Pedestrian') {
    return 'AND number_of_pedestrians_killed = 0 AND number_of_pedestrians_injured = 0';
  } else if (harm === 'ALL' && persona === 'Cyclist') {
    // NOTE: this is where I ran into trouble, how to select all pedestrians
    // not injured or killed?
    return '';
  }
  // if harm and persona equal 'ALL' return an empty string
  return '';
};

// Generates the SQL query for the Carto layer based on filter params & app element
// @param {object} params: key values associated with filters derived from app state
// @param {string} startDate: min date; required
// @param {string} endDate: max date; required
// @param {string} harm: crash type, one of 'ALL', 'cyclist', 'motorist', 'ped'
// @param {string} persona: crash type, of of 'ALL', 'fatality', 'injury', 'no inj/fat'
export const configureMapSQL = (params) => {
  const { startDate, endDate, harm, persona } = params;

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
      SUM(c.number_of_pedestrians_injured) as pedestrians_injured,
      SUM(c.number_of_pedestrians_killed) as pedestrians_killed,
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
    ${crashTypeWhere(harm, persona)}
    AND
      c.the_geom IS NOT NULL
    GROUP BY
      c.the_geom, c.the_geom_webmercator, c.on_street_name, c.cross_street_name
  `;
};

export const configureStatsSQL = (params) => {
  const { startDate, endDate, harm, persona } = params;

  return sls`
    SELECT
      COUNT(c.cartodb_id) as total_crashes,
      SUM(CASE WHEN c.number_of_persons_injured > 0 THEN 1 ELSE 0 END) AS total_crashes_with_injury,
      SUM(CASE WHEN c.number_of_persons_killed > 0 THEN 1 ELSE 0 END) AS total_crashes_with_death,
      SUM(c.number_of_cyclist_injured) as cyclist_injured,
      SUM(c.number_of_cyclist_killed) as cyclist_killed,
      SUM(c.number_of_motorist_injured) as motorist_injured,
      SUM(c.number_of_motorist_killed) as motorist_killed,
      SUM(c.number_of_pedestrians_injured) as pedestrians_injured,
      SUM(c.number_of_pedestrians_killed) as pedestrians_killed,
      SUM(c.number_of_persons_injured) as persons_injured,
      SUM(c.number_of_persons_killed) as persons_killed
    FROM
      ${nyc_crashes} c
    WHERE
      (date_val <= date '${endDate}')
    AND
      (date_val >= date '${startDate}')
    ${crashTypeWhere(harm, persona)}
  `;
};

export const configureFactorsSQL = (params) => {
  const { startDate, endDate, harm, persona } = params;

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
      ${crashTypeWhere(harm, persona)}
      UNION ALL
      SELECT
        c.contributing_factor_vehicle_2 as factor
      FROM
        ${nyc_crashes} c
      WHERE
        (date_val <= date '${endDate}')
      AND
        (date_val >= date '${startDate}')
      ${crashTypeWhere(harm, persona)}
      UNION ALL
      SELECT
        c.contributing_factor_vehicle_3 as factor
      FROM
        ${nyc_crashes} c
      WHERE
        (date_val <= date '${endDate}')
      AND
        (date_val >= date '${startDate}')
      ${crashTypeWhere(harm, persona)}
      UNION ALL
      SELECT
        c.contributing_factor_vehicle_4 as factor
      FROM
        ${nyc_crashes} c
      WHERE
        (date_val <= date '${endDate}')
      AND
        (date_val >= date '${startDate}')
      ${crashTypeWhere(harm, persona)}
      UNION ALL
      SELECT
        c.contributing_factor_vehicle_5 as factor
      FROM
        ${nyc_crashes} c
      WHERE
        (date_val <= date '${endDate}')
      AND
        (date_val >= date '${startDate}')
      ${crashTypeWhere(harm, persona)}
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
