import sls from 'single-line-string';

import { cartoTables } from './app_config';

const { nyc_borough,
  nyc_city_council,
  nyc_community_board,
  nyc_neighborhood,
  nyc_nypd_precinct,
  nyc_intersections,
  nyc_crashes } = cartoTables;

// Links each boundary filter name to a SQL query
export const filterByAreaSQL = {
  borough: sls`
    SELECT DISTINCT
      identifier,
      ST_Collect(the_geom) as the_geom
    FROM
      ${nyc_borough}
    GROUP BY
      identifier
  `,

  city_council: sls`
    SELECT DISTINCT
      identifier,
      ST_Collect(the_geom) as the_geom
    FROM
      ${nyc_city_council}
    GROUP BY
      identifier
  `,

  community_board: sls`
    SELECT DISTINCT
      identifier,
      ST_Collect(the_geom) as the_geom
    FROM
      ${nyc_community_board}
    GROUP BY
      identifier
  `,

  neighborhood: sls`
    SELECT DISTINCT
      identifier,
      ST_Collect(the_geom) as the_geom
    FROM
      ${nyc_neighborhood}
    GROUP BY
      identifier
  `,

  nypd_precinct: sls`
    SELECT DISTINCT
      identifier,
      ST_Collect(the_geom) as the_geom
    FROM
      ${nyc_nypd_precinct}
    GROUP BY
      identifier
  `,

  intersection: sls`
    SELECT
      CONCAT(borough, ', ', name, '|', cartodb_id) AS identifier,
      the_geom
    FROM
      ${nyc_intersections}
    WHERE crashcount IS NOT NULL AND borough != ''
    ORDER BY crashcount DESC
    LIMIT 500
  `,
};

// TO DO: Use a single Query for the following 3 date queries
// selects all years for crash data, used by MonthYearSelector.js component
export const crashesYearRangeSQL = () => sls`
  SELECT DISTINCT year
  FROM ${nyc_crashes}
  ORDER BY year DESC
`;

// selects min and max year-month formatted like "YYYY-MM"
// used by MonthYearSelector.js component
export const minMaxDateRange = () => sls`
  SELECT
  min(year::text || '-' || LPAD(month::text, 2, '0')),
  max(year::text || '-' || LPAD(month::text, 2, '0'))
  FROM ${nyc_crashes}
`;

// selects max date, used for DownloadData.js component's "last updated on" msg
export const crashesMaxDate = () => sls`
  SELECT max(date_val) as max_date
  FROM ${nyc_crashes}
`;

/*
***************************** SQL HELPERS **************************************
*/

// Generates the SQL WHERE clause for "Filter by Date Range"
// @param {object} startDate, a moment.js object
// @param {object} endDate, a moment.js object
const filterByDateWhereClause = (startDate, endDate) =>
  sls`
      (
        year::text || LPAD(month::text, 2, '0') <=
        '${endDate.year()}' || LPAD(${endDate.month() + 1}::text, 2, '0')
      )
    AND
      (
        year::text || LPAD(month::text, 2, '0') >=
        '${startDate.year()}' || LPAD(${startDate.month() + 1}::text, 2, '0')
      )
  `;

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

// Links the Filter by Boundary button name to corresponding Carto table name
// NOTE: Deliberately not using Borough, because when > 1 year of data is selected
// the spatial join will time out on Borough polygons
export const filterAreaBtnTableMap = {
  borough: undefined,
  community_board: nyc_community_board,
  city_council: nyc_city_council,
  neighborhood: nyc_neighborhood,
  nypd_precinct: nyc_nypd_precinct,
  intersection: nyc_intersections,
};

// Creates the spatial join clause with a boundary table geom
// @param {string} areaName, name of boundary, eg 'Borough' or 'City Council Districts'
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
// NOTE: Deliberately not using Borough, because when > 1 year of data is selected
// the spatial join will time out on Borough polygons
// @param {number || string} identifier, unique id of boundary polygon
// @param {string} geo, name of boundary table identifier column belongs to
const filterByIdentifierWhereClause = (identifier, geo) => {
  if (geo === 'borough' && identifier) {
    return `AND c.borough ilike '%${identifier}%'`;
  } else if (geo === 'intersection' && identifier) {
    const cartodb_id = identifier.split('|')[1];
    return `AND a.cartodb_id = ${cartodb_id}`;
  } else if (geo !== 'borough' && identifier) {
    return `AND a.identifier = $$${identifier}$$`;
  }
  return '';
};

// Creates the PostGIS query for selecting crash data by custom area created by Leaflet.Draw
// @param {array} lonLatArray, an array of longitude, latitude arrays that form an enclosed polygon
const filterByCustomAreaClause = (lonLatArray) => {
  if (lonLatArray && lonLatArray.length) {
    // PostGIS GeomFromText expects lon lat coords like (-73.91 40.74, -73.89 40.73, ...)
    const coordinates = lonLatArray.map(lonLat => lonLat.join(' '));
    return sls`
      AND
        ST_Contains(
          ST_GeomFromText(
            'POLYGON(( ${coordinates} ))',
          4326),
          c.the_geom
        )
    `;
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
  const { startDate, endDate, filterType, geo, identifier, lngLats } = params;

  return sls`
    SELECT * FROM
    (
      SELECT
        c.the_geom as the_geom,
        c.the_geom_webmercator as the_geom_webmercator,
        c.on_street_name as on_street_name,
        c.cross_street_name as cross_street_name,
        COUNT(c.crash_count) as total_crashes,
        SUM(c.number_of_cyclist_injured) as cyclist_injured,
        SUM(c.number_of_cyclist_killed) as cyclist_killed,
        SUM(c.number_of_motorist_injured) as motorist_injured,
        SUM(c.number_of_motorist_killed) as motorist_killed,
        SUM(c.number_of_pedestrian_injured) as pedestrian_injured,
        SUM(c.number_of_pedestrian_killed) as pedestrian_killed,
        SUM(c.number_of_pedestrian_injured + c.number_of_cyclist_injured + c.number_of_motorist_injured) as persons_injured,
        SUM(c.number_of_pedestrian_killed + c.number_of_cyclist_killed + c.number_of_motorist_killed) as persons_killed
      FROM
        ${nyc_crashes} c
      ${joinToGeoTableClause(geo)}
      WHERE
      ${filterByDateWhereClause(startDate, endDate)}
      ${filterByCustomAreaClause(lngLats)}
      ${filterByTypeWhereClause(filterType)}
      ${filterByIdentifierWhereClause(identifier, geo)}
      AND
        c.the_geom IS NOT NULL
      GROUP BY
        c.the_geom, c.the_geom_webmercator, c.on_street_name, c.cross_street_name
    ) _
    ORDER BY
    CASE WHEN (persons_killed > 0) THEN 3
    WHEN (persons_injured > 0) THEN 2
    WHEN (total_crashes > 11) THEN 1
    ELSE 0
    END
  `;
};

/*
 ******************************* STATS *****************************************
 */

export const configureStatsSQL = (params) => {
  const { startDate, endDate, filterType, geo, identifier, lngLats } = params;

  return sls`
    SELECT
      COUNT(c.cartodb_id) as total_crashes,
      SUM(c.number_of_cyclist_injured) as cyclist_injured,
      SUM(c.number_of_cyclist_killed) as cyclist_killed,
      SUM(c.number_of_motorist_injured) as motorist_injured,
      SUM(c.number_of_motorist_killed) as motorist_killed,
      SUM(c.number_of_pedestrian_injured) as pedestrian_injured,
      SUM(c.number_of_pedestrian_killed) as pedestrian_killed,
      SUM(c.number_of_pedestrian_injured + c.number_of_cyclist_injured + c.number_of_motorist_injured) as persons_injured,
      SUM(c.number_of_pedestrian_killed + c.number_of_cyclist_killed + c.number_of_motorist_killed) as persons_killed
    FROM
      ${nyc_crashes} c
    ${joinToGeoTableClause(geo)}
    WHERE
    ${filterByDateWhereClause(startDate, endDate)}
    ${filterByCustomAreaClause(lngLats)}
    ${filterByTypeWhereClause(filterType)}
    ${filterByIdentifierWhereClause(identifier, geo)}
  `;
};

/*
 *************************** CONTRIBUTING FACTORS ******************************
*/

export const configureFactorsSQL = (params) => {
  const { startDate, endDate, filterType, geo, identifier, lngLats } = params;

  return sls`
    WITH all_factors as (
      SELECT
        unnest(c.contributing_factor) as factor
      FROM
      ${nyc_crashes} c
      ${joinToGeoTableClause(geo)}
      WHERE
      ${filterByDateWhereClause(startDate, endDate)}
      ${filterByCustomAreaClause(lngLats)}
      ${filterByTypeWhereClause(filterType)}
      ${filterByIdentifierWhereClause(identifier, geo)}
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

/*
 ******************************* Download Data *********************************
*/

// Creates the SQL query for "Download Data" buttons
export const configureDownloadDataSQL = (params) => {
  const { startDate, endDate, filterArea, filterType } = params;
  const { geo, lngLats, identifier } = filterArea;

  return sls`
    SELECT
      c.cartodb_id,
      c.socrata_id,
      c.the_geom,
      c.on_street_name,
      c.cross_street_name,
      c.date_val AS date_time,
      c.latitude,
      c.longitude,
      c.borough,
      c.zip_code,
      c.crash_count,
      c.number_of_cyclist_injured,
      c.number_of_cyclist_killed,
      c.number_of_motorist_injured,
      c.number_of_motorist_killed,
      c.number_of_pedestrian_injured,
      c.number_of_pedestrian_killed,
      c.number_of_persons_injured,
      c.number_of_persons_killed,
      array_to_string(c.contributing_factor, ',') as contributing_factors,
      array_to_string(c.vehicle_type, ',') as vehicle_types
    FROM ${nyc_crashes} c
    ${joinToGeoTableClause(geo)}
    WHERE
    ${filterByDateWhereClause(startDate, endDate)}
    ${filterByCustomAreaClause(lngLats)}
    ${filterByTypeWhereClause(filterType)}
    ${filterByIdentifierWhereClause(identifier, geo)}
  `;
};
