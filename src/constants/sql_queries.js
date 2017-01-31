import sls from 'single-line-string';

import { cartoTables } from './app_config';

const { nyc_borough,
  nyc_city_council,
  nyc_community_board,
  nyc_neighborhood,
  nyc_nypd_precinct,
  nyc_zip_code,
  nyc_crashes } = cartoTables;

export const filterByAreaSQL = {
  Borough: sls`
    SELECT DISTINCT
      borough,
      identifier,
      cartodb_id,
      the_geom,
      the_geom_webmercator
    FROM
      ${nyc_borough}
    ORDER BY
      identifier
  `,

  'City Council District': sls`
    SELECT DISTINCT
      identifier,
      cartodb_id,
      the_geom_webmercator
    FROM
      ${nyc_city_council}
    ORDER BY
      identifier
  `,

  'Community Board': sls`
    SELECT DISTINCT
      identifier,
      cartodb_id,
      the_geom_webmercator
    FROM
      ${nyc_community_board}
    ORDER BY
      identifier
  `,

  'Neighborhood (NTA)': sls`
    SELECT DISTINCT
      borough,
      identifier,
      cartodb_id,
      the_geom_webmercator
    FROM
      ${nyc_neighborhood}
    ORDER BY
      borough, identifier
  `,

  'NYPD Precinct': sls`
    SELECT DISTINCT
      borough,
      identifier,
      cartodb_id,
      the_geom_webmercator
    FROM
      ${nyc_nypd_precinct}
    ORDER BY
      borough, identifier
  `,

  'Zipcode (ZCTA)': sls`
    SELECT DISTINCT
      borough,
      identifier,
      cartodb_id,
      the_geom_webmercator
    FROM
      ${nyc_zip_code}
    ORDER BY
      borough, identifier
  `,
};

// Selects max and min date from all crashes
export const dateBounds = () => sls`
  SELECT
    MAX(date) as max_date,
    MIN(date) as min_date
  FROM
    ${nyc_crashes}
`;

/*
***************************** SQL HELPERS **************************************
*/

// Generates the SQL WHERE clause for "Filter by Type"
// @param {object} the store.filterType piece of state
const filterByTypeWhereClause = (filterType) => {
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

// Maps the Filter by Boundary button name to a Carto table name
export const filterAreaBtnTableMap = {
  Borough: nyc_borough,
  'Community Board': nyc_community_board,
  'City Council District': nyc_city_council,
  'Neighborhood (NTA)': nyc_neighborhood,
  'NYPD Precinct': nyc_nypd_precinct,
  'Zipcode (ZCTA)': nyc_zip_code,
};

// Creates the spatial join clause with a boundary table geom
const joinToGeoTableClause = (areaName) => {
  const geoTable = filterAreaBtnTableMap[areaName];
  if (geoTable) {
    return sls`
      JOIN ${geoTable} a
      ON ST_Within(c.the_geom, a.the_geom)
    `;
  }
  return '';
};

// Creates the WHERE clause for boundary table identifier
const filterByIdentifierWhereClause = (identifier) => {
  if (identifier) {
    return `AND a.identifier = ${identifier}`;
  }
  return '';
};

/*
 ********************************** MAP ****************************************
 */

// Generates the SQL query for the Carto layer based on filter params & app element
// @param {object} params: key values associated with filters derived from app state
// @param {string} startDate: min date; required
// @param {string} endDate: max date; required
// @param {string} harm: crash type, one of 'ALL', 'cyclist', 'motorist', 'ped'
// @param {string} persona: crash type, of of 'ALL', 'fatality', 'injury', 'no inj/fat'
export const configureMapSQL = (params) => {
  const { startDate, endDate, filterType, geo, identifier } = params;

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
    ${joinToGeoTableClause(geo)}
    WHERE
      (date_val <= date '${endDate}')
    AND
      (date_val >= date '${startDate}')
    ${filterByTypeWhereClause(filterType)}
    ${filterByIdentifierWhereClause(identifier)}
    AND
      c.the_geom IS NOT NULL
    GROUP BY
      c.the_geom, c.the_geom_webmercator, c.on_street_name, c.cross_street_name
  `;
};

/*
 ******************************* STATS *****************************************
 */

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
    ${filterByTypeWhereClause(filterType)}
  `;
};

/*
 *************************** CONTRIBUTING FACTORS ******************************
*/

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
      ${filterByTypeWhereClause(filterType)}
      UNION ALL
      SELECT
        c.contributing_factor_vehicle_2 as factor
      FROM
        ${nyc_crashes} c
      WHERE
        (date_val <= date '${endDate}')
      AND
        (date_val >= date '${startDate}')
      ${filterByTypeWhereClause(filterType)}
      UNION ALL
      SELECT
        c.contributing_factor_vehicle_3 as factor
      FROM
        ${nyc_crashes} c
      WHERE
        (date_val <= date '${endDate}')
      AND
        (date_val >= date '${startDate}')
      ${filterByTypeWhereClause(filterType)}
      UNION ALL
      SELECT
        c.contributing_factor_vehicle_4 as factor
      FROM
        ${nyc_crashes} c
      WHERE
        (date_val <= date '${endDate}')
      AND
        (date_val >= date '${startDate}')
      ${filterByTypeWhereClause(filterType)}
      UNION ALL
      SELECT
        c.contributing_factor_vehicle_5 as factor
      FROM
        ${nyc_crashes} c
      WHERE
        (date_val <= date '${endDate}')
      AND
        (date_val >= date '${startDate}')
      ${filterByTypeWhereClause(filterType)}
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
