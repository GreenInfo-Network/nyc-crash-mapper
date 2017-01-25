import sls from 'single-line-string';

import { cartoTables } from './app_config';

const { nyc_borough,
  nyc_city_council,
  nyc_community_board,
  nyc_neighborhood,
  nyc_nypd_precinct,
  nyc_zip_codes,
  nyc_crashes } = cartoTables;

// Selects distinct boroughs
export const distinctBorough = () => sls`
  SELECT DISTINCT
    borough,
    identifier,
    cartodb_id,
    the_geom_webmercator
  FROM
    ${nyc_borough}
  ORDER BY
    identifier
`;

// Selects distinct city council districts
export const distinctCouncil = () => sls`
  SELECT DISTINCT
    identifier,
    cartodb_id,
    the_geom_webmercator
  FROM
    ${nyc_city_council}
  ORDER BY
    identifier
`;

export const distinctCommBoards = () => sls`
  SELECT DISTINCT
    identifier,
    cartodb_id,
    the_geom_webmercator
  FROM
    ${nyc_community_board}
  ORDER BY
    identifier
`;

export const distinctNeighborhoods = () => sls`
  SELECT DISTINCT
    borough,
    identifier,
    cartodb_id,
    the_geom_webmercator
  FROM
    ${nyc_neighborhood}
  ORDER BY
    borough, identifier
`;

export const distinctPrecincts = () => sls`
  SELECT DISTINCT
    borough,
    identifier,
    cartodb_id,
    the_geom_webmercator
  FROM
    ${nyc_nypd_precinct}
  ORDER BY
    borough, identifier
`;

export const distinctZipcodes = () => sls`
  SELECT DISTINCT
    borough,
    identifier,
    cartodb_id,
    the_geom_webmercator
  FROM
    ${nyc_zip_codes}
  ORDER BY
    borough, identifier
`;

// Selects max and min date from all crashes
export const dateBounds = () => sls`
  SELECT
    MAX(date) as max_date,
    MIN(date) as min_date
  FROM
    ${nyc_crashes}
`;

/*
 ************************ STATS ************************
 */

// Counts all death / injury stats for a given date range
// @param {date} startDate Min date of date range, formatted like 'YYYY-MM-DD'
// @param {date} endDate Max date of date range, formatted like 'YYYY-MM-DD'
export const statsDate = ({ endDate, startDate }) => sls`
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
    (date <= date '${endDate}')
  AND
    (date >= date '${startDate}')
`;

// Counts all death / injury stats for a given date range filtered by some geometry table
// @param {date} startDate Min date of date range, formatted like 'YYYY-MM-DD'
// @param {date} endDate Max date of date range, formatted like 'YYYY-MM-DD'
// @param {string} geoTable Table with boundaries / geometry to join on
// @param {number} identifier A number referring to a borough, city council district, etc
export const statsDateByArea = ({ startDate, endDate, geoTable, identifier }) => sls`
  SELECT
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
  JOIN
    ${geoTable} a
  ON
    ST_Within(c.the_geom, a.the_geom)
  WHERE
    (date <= date '${endDate}')
  AND
    (date >= date '${startDate}')
  AND
    (a.identifier = ${identifier})
`;

// Counts all death / injury stats for a given date range filtered by a custom shape.
// @param {date} startDate Min date of date range, formatted like 'YYYY-MM-DD'
// @param {date} endDate Max date of date range, formatted like 'YYYY-MM-DD'
// @param {PostGIS} shape, eg: 'POLYGON(( -73.96682739257812 40.68089838511525,
//  -73.94691467285156 40.63193284946615, -73.90056610107422 40.65720146993478,
//  -73.92974853515625 40.69755930345006, -73.96682739257812 40.68089838511525 ))'
export const statsDateByCustomArea = ({ startDate, endDate, shape }) => sls`
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
    (date <= date '${endDate}')
  AND
    (date >= date '${startDate}')
  AND
    (ST_Contains(ST_GeomFromText('${shape}', 4326), c.the_geom))
`;

// Counts all death / injury stats for a given date range
// @param {date} startDate Min date of date range, formatted like 'YYYY-MM-DD'
// @param {date} endDate Max date of date range, formatted like 'YYYY-MM-DD'
// @param {string} filterCol Name of column to filter by, eg: number_of_persons_injured,
export const statsDateFiltered = ({ startDate, endDate, filterCol }) => sls`
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
    (date <= date '${endDate}')
  AND
    (date >= date '${startDate}')
  AND
    (${filterCol} > 0)
`;

// Counts all death / injury stats for a given date range filtered by some geometry table
// and some column
// @param {date} startDate Min date of date range, formatted like 'YYYY-MM-DD'
// @param {date} endDate Max date of date range, formatted like 'YYYY-MM-DD'
// @param {string} filterCol Name of column to filter by, eg: number_of_persons_injured,
// @param {string} geoTable Table with boundaries / geometry to join on
// @param {number} identifier A number referring to a borough, city council district, etc
export const statsDateByAreaFiltered = ({ startDate, endDate, filterCol, geoTable, identifier }) => sls`
  SELECT
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
  JOIN
    ${geoTable} a
  ON
    ST_Within(c.the_geom, a.the_geom)
  WHERE
    (date <= date '${startDate}')
  AND
    (date >= date '${endDate}')
  AND
    (a.identifier = ${identifier})
  AND
    (${filterCol} > 0)
`;

/*
 ************************ MAP ************************
 */

// Default: citywide crashes for all crash & person types
// @param {date} startDate Min date of date range, formatted like 'YYYY-MM-DD'
// @param {date} endDate Max date of date range, formatted like 'YYYY-MM-DD'
export const crashesByDate = ({ startDate, endDate }) => sls`
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
  AND
   c.the_geom IS NOT NULL
  GROUP BY
    c.the_geom, c.the_geom_webmercator, c.on_street_name, c.cross_street_name
`;
