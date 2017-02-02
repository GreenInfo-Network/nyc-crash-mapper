-- PostGIS SQL queries for NYC Crash Mapper
-- code credit: Akil Harris: https://github.com/akilism
-- NOTE: values that are prepended with a colon are template values and should be replaced, eg `:identifier`
-- CARTO queries do not require a semicolon unless multiple queries are executed one after another
-- `table_20k_crashes` refers a sample of NYC Open Data Portal's NYPD Motor Vehicle Collisions data

-----------------------
--- Boundary Tables ---
-----------------------

-- name: distinct-borough
-- Selects distinct boroughs
SELECT DISTINCT
  borough,
  identifier,
  cartodb_id,
  the_geom_webmercator
FROM
  nyc_borough
ORDER BY
  identifier

-- name: distinct-city-council
-- Selects distinct city council districts
SELECT DISTINCT
  identifier,
  cartodb_id,
  the_geom_webmercator
FROM
  nyc_city_council
ORDER BY
  identifier

-- name: distinct-community-board
-- Selects distinct community boards
SELECT DISTINCT
  identifier,
  cartodb_id,
  the_geom_webmercator
FROM
  nyc_community_board
ORDER BY
  identifier

-- name: distinct-neighborhood
-- Selects distinct neighborhoods
SELECT DISTINCT
  borough,
  identifier,
  cartodb_id,
  the_geom_webmercator
FROM
  nyc_neighborhood
ORDER BY
  borough, identifier

-- name: distinct-precinct
-- Selects distinct nypd precincts
SELECT DISTINCT
  borough,
  identifier,
  cartodb_id,
  the_geom_webmercator
FROM
  nyc_nypd_precinct
ORDER BY
  borough, identifier

-- name: distinct-zip-code
-- Selects distinct zip codes
SELECT DISTINCT
  borough,
  identifier,
  cartodb_id,
  the_geom_webmercator
FROM
  nyc_zip_codes
ORDER BY
  borough, identifier

--name: date-bounds
-- Selects max and min date from all crashes
SELECT
  MAX(date) as max_date,
  MIN(date) as min_date
FROM
  table_20k_crashes

---------------------
--- Download Data ---
---------------------

-- basic select query, used by download data
SELECT
  c.on_street_name,
  c.cross_street_name,
  c.cartodb_id,
  c.unique_key,
  c.date_val as date,
  c.latitude,
  c.longitude,
  c.borough,
  c.zip_code,
  c.number_of_cyclist_injured,
  c.number_of_cyclist_killed,
  c.number_of_motorist_injured,
  c.number_of_motorist_killed,
  c.number_of_pedestrian_injured,
  c.number_of_pedestrian_killed,
  c.number_of_persons_injured,
  c.number_of_persons_killed,
  c.contributing_factor_vehicle_1,
  c.contributing_factor_vehicle_2,
  c.contributing_factor_vehicle_3,
  c.contributing_factor_vehicle_4,
  c.contributing_factor_vehicle_5,
  c.vehicle_type_code_1,
  c.vehicle_type_code_2,
  c.vehicle_type_code_3,
  c.vehicle_type_code_4,
  c.vehicle_type_code_5
FROM table_20k_crashes c

--------------
--- Stats ----
--------------

-- name: stats-date
-- Counts all death / injury stats for a given date range
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
  table_20k_crashes c
WHERE
  (date <= date ':end-date')
AND
  (date >= date ':start-date')

--name: stats-date-by-area
-- Counts all death / injury stats for a given date range filtered by some geometry table
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
  table_20k_crashes c
JOIN
  :geo-table a
ON
  ST_Within(c.the_geom, a.the_geom)
WHERE
  (date <= date ':end-date')
AND
  (date >= date ':start-date')
AND
  (a.identifier = :identifier)

-- name: stats-date-by-custom-area
-- Counts all death / injury stats for a given date range filtered by a custom shape.
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
  table_20k_crashes c
WHERE
  (date <= date ':end-date')
AND
  (date >= date ':start-date')
AND
  (ST_Contains(:shape, c.the_geom))

-- name: stats-date-filtered
-- Counts all death / injury stats for a given date range
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
  table_20k_crashes c
WHERE
  (date <= date ':end-date')
AND
  (date >= date ':start-date')
AND
  (:filter-col > 0)

--name: stats-date-by-area-filtered
-- Counts all death / injury stats for a given date range filtered by some geometry table
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
  table_20k_crashes c
JOIN
  :geo-table a
ON
  ST_Within(c.the_geom, a.the_geom)
WHERE
  (date <= date ':end-date')
AND
  (date >= date ':start-date')
AND
  (a.identifier = :identifier)
AND
  (:filter-col > 0)

-- name: stats-date-by-custom-area-filtered
-- Counts all death / injury stats for a given date range
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
  table_20k_crashes c
WHERE
  (date <= date ':end-date')
AND
  (date >= date ':start-date')
AND
  (:filter-col > 0)
AND
  (ST_Contains(:shape, c.the_geom))


-----------------------
--- Crashes For Map ---
-----------------------

--name: crashes-by-date
-- Selects crashes for map by date.
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
  table_20k_crashes c
WHERE
  (date <= date ':end-date')
AND
  (date >= date ':start-date')
AND
 c.the_geom IS NOT NULL
GROUP BY
  c.the_geom, c.the_geom_webmercator, c.on_street_name, c.cross_street_name

--name: crashes-by-date-custom-area
-- Selects crashes for map by date filtered by a custom area.
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
  table_20k_crashes c
WHERE
  (date <= date ':end-date')
AND
  (date >= date ':start-date')
AND
  (ST_Contains(:shape, c.the_geom))
GROUP BY
  c.the_geom, c.the_geom_webmercator, c.on_street_name, c.cross_street_name

--name: crashes-by-date-area
-- Selects crashes for map by area and date.
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
  table_20k_crashes c
JOIN
  :geo-table a
ON
  ST_Within(c.the_geom, a.the_geom)
WHERE
  (date <= date ':end-date')
AND
  (date >= date ':start-date')
AND
  (a.identifier = :identifier)
GROUP BY
  c.the_geom, c.the_geom_webmercator, c.on_street_name, c.cross_street_name

--name: crashes-by-date-filtered
-- Selects crashes for map by date.
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
  table_20k_crashes c
WHERE
  (date <= date ':end-date')
AND
  (date >= date ':start-date')
AND
  (:filter-col > 0)
AND
	c.the_geom IS NOT NULL
GROUP BY
  c.the_geom, c.the_geom_webmercator, c.on_street_name, c.cross_street_name

--name: crashes-by-date-custom-area-filtered
-- Selects crashes for map by date.
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
  table_20k_crashes c
WHERE
  (date <= date ':end-date')
AND
  (date >= date ':start-date')
AND
  (:filter-col > 0)
AND
  (ST_Contains(:shape, c.the_geom))
GROUP BY
  c.the_geom, c.the_geom_webmercator, c.on_street_name, c.cross_street_name

--name: crashes-by-date-area-filtered
-- Selects crashes for map by area and date.
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
  table_20k_crashes c
JOIN
  :geo-table a
ON
  ST_Within(c.the_geom, a.the_geom)
WHERE
  (date <= date ':end-date')
AND
  (date >= date ':start-date')
AND
  (:filter-col > 0)
AND
  (a.identifier = :identifier)
GROUP BY
  c.the_geom, c.the_geom_webmercator, c.on_street_name, c.cross_street_name


--------------------
--- All Factors ----
--------------------

-- name: all-factors-date-by-area-filtered
-- Counts all factors for a given date range filtered by some geometry table.
WITH all_factors as (
  SELECT
    c.contributing_factor_vehicle_1 as factor
  FROM
    table_20k_crashes c
  JOIN
    :geo-table a
  ON
    (ST_Within(c.the_geom, a.the_geom) AND (a.identifier = :identifier))
  WHERE
    (date <= date ':end-date')
  AND
    (date >= date ':start-date')
  AND
    (:filter-col > 0)
  UNION ALL
  SELECT
    c.contributing_factor_vehicle_2 as factor
  FROM
    table_20k_crashes c
  JOIN
    :geo-table a
  ON
    (ST_Within(c.the_geom, a.the_geom) AND (a.identifier = :identifier))
  WHERE
    (date <= date ':end-date')
  AND
    (date >= date ':start-date')
  AND
    (:filter-col > 0)
    UNION ALL
  SELECT
    c.contributing_factor_vehicle_3 as factor
  FROM
    table_20k_crashes c
  JOIN
    :geo-table a
  ON
    (ST_Within(c.the_geom, a.the_geom) AND (a.identifier = :identifier))
  WHERE
    (date <= date ':end-date')
  AND
    (date >= date ':start-date')
  AND
    (:filter-col > 0)
    UNION ALL
  SELECT
    c.contributing_factor_vehicle_4 as factor
  FROM
    table_20k_crashes c
  JOIN
    :geo-table a
  ON
    (ST_Within(c.the_geom, a.the_geom) AND (a.identifier = :identifier))
  WHERE
    (date <= date ':end-date')
  AND
    (date >= date ':start-date')
  AND
    (:filter-col > 0)
    UNION ALL
  SELECT
    c.contributing_factor_vehicle_5 as factor
  FROM
    table_20k_crashes c
  JOIN
    :geo-table a
  ON
    (ST_Within(c.the_geom, a.the_geom) AND (a.identifier = :identifier))
  WHERE
    (date <= date ':end-date')
  AND
    (date >= date ':start-date')
  AND
    (:filter-col > 0)
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

-- name: all-factors-date-by-custom-area-filtered
-- Counts all factors for a given date range.
WITH all_factors as (
  SELECT
    contributing_factor_vehicle_1 as factor
  FROM
    table_20k_crashes
  WHERE
    (date <= date ':end-date')
  AND
    (date >= date ':start-date')
  AND
    (:filter-col > 0)
  AND
    (ST_Contains(:shape, the_geom))
  UNION ALL
  SELECT
    contributing_factor_vehicle_2 as factor
  FROM
    table_20k_crashes
  WHERE
    (date <= date ':end-date')
  AND
    (date >= date ':start-date')
  AND
    (:filter-col > 0)
  AND
    (ST_Contains(:shape, the_geom))
    UNION ALL
  SELECT
    contributing_factor_vehicle_3 as factor
  FROM
    table_20k_crashes
  WHERE
    (date <= date ':end-date')
  AND
    (date >= date ':start-date')
  AND
    (:filter-col > 0)
  AND
    (ST_Contains(:shape, the_geom))
    UNION ALL
  SELECT
    contributing_factor_vehicle_4 as factor
  FROM
    table_20k_crashes
  WHERE
    (date <= date ':end-date')
  AND
    (date >= date ':start-date')
  AND
    (:filter-col > 0)
  AND
    (ST_Contains(:shape, the_geom))
    UNION ALL
  SELECT
    contributing_factor_vehicle_5 as factor
  FROM
    table_20k_crashes
  WHERE
    (date <= date ':end-date')
  AND
    (date >= date ':start-date')
  AND
    (:filter-col > 0)
  AND
    (ST_Contains(:shape, the_geom))
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

----------------------
--- Intersections ----
----------------------

--name: intersections-by-date-with-order
--Select all intersections filtered by date and order by a col
SELECT
  concat_ws(',', c.latitude, c.longitude) as pos,
  concat_ws(',', c.on_street_name, c.cross_street_name) as streets,
  c.the_geom,
  COUNT(c.cartodb_id) as total_crashes,
  SUM(c.number_of_cyclist_injured) as cyclist_injured,
  SUM(c.number_of_cyclist_killed) as cyclist_killed,
  SUM(c.number_of_motorist_injured) as motorist_injured,
  SUM(c.number_of_motorist_killed) as motorist_killed,
  SUM(c.number_of_pedestrians_injured) as pedestrians_injured,
  SUM(c.number_of_pedestrians_killed) as pedestrians_killed,
  SUM(c.number_of_persons_injured) as persons_injured,
  SUM(c.number_of_persons_killed) as persons_killed,
  ((SUM(c.number_of_persons_killed) * 2.75) +
   (SUM(c.number_of_persons_injured) * 1.5) +
   (COUNT(c.cartodb_id) * 0.75)) as dval,
  SUM(CASE WHEN c.number_of_persons_injured > 0 THEN 1 ELSE 0 END) AS total_crashes_with_injury,
  SUM(CASE WHEN c.number_of_persons_killed > 0 THEN 1 ELSE 0 END) AS total_crashes_with_death
FROM
  table_20k_crashes c
WHERE
  (date <= date ':end-date')
AND
  (date >= date ':start-date')
GROUP BY
  c.the_geom, c.latitude, c.longitude, c.on_street_name, c.cross_street_name
ORDER BY
  :order-col :order-dir
LIMIT 100

--name: intersections-by-date-with-order-filtered
--Select all intersections filtered by date and order by a col
SELECT
  concat_ws(',', c.latitude, c.longitude) as pos,
  concat_ws(',', c.on_street_name, c.cross_street_name) as streets,
  c.the_geom,
  COUNT(c.cartodb_id) as total_crashes,
  SUM(c.number_of_cyclist_injured) as cyclist_injured,
  SUM(c.number_of_cyclist_killed) as cyclist_killed,
  SUM(c.number_of_motorist_injured) as motorist_injured,
  SUM(c.number_of_motorist_killed) as motorist_killed,
  SUM(c.number_of_pedestrians_injured) as pedestrians_injured,
  SUM(c.number_of_pedestrians_killed) as pedestrians_killed,
  SUM(c.number_of_persons_injured) as persons_injured,
  SUM(c.number_of_persons_killed) as persons_killed,
  ((SUM(c.number_of_persons_killed) * 2.75) +
   (SUM(c.number_of_persons_injured) * 1.5) +
   (COUNT(c.cartodb_id) * 0.75)) as dval,
  SUM(CASE WHEN c.number_of_persons_injured > 0 THEN 1 ELSE 0 END) AS total_crashes_with_injury,
  SUM(CASE WHEN c.number_of_persons_killed > 0 THEN 1 ELSE 0 END) AS total_crashes_with_death
FROM
  table_20k_crashes c
WHERE
  (date <= date ':end-date')
AND
  (date >= date ':start-date')
AND
  (:filter-col > 0)
GROUP BY
  c.the_geom, c.latitude, c.longitude, c.on_street_name, c.cross_street_name
ORDER BY
  :order-col :order-dir
LIMIT 100

--name: intersections-by-date-area-with-order
--Select all intersections filtered by area and date and order by a col
SELECT
  concat_ws(',', c.latitude, c.longitude) as pos,
  concat_ws(',', c.on_street_name, c.cross_street_name) as streets,
  c.the_geom,
  COUNT(c.cartodb_id) as total_crashes,
  SUM(c.number_of_cyclist_injured) as cyclist_injured,
  SUM(c.number_of_cyclist_killed) as cyclist_killed,
  SUM(c.number_of_motorist_injured) as motorist_injured,
  SUM(c.number_of_motorist_killed) as motorist_killed,
  SUM(c.number_of_pedestrians_injured) as pedestrians_injured,
  SUM(c.number_of_pedestrians_killed) as pedestrians_killed,
  SUM(c.number_of_persons_injured) as persons_injured,
  SUM(c.number_of_persons_killed) as persons_killed,
  ((SUM(c.number_of_persons_killed) * 2.75) +
   (SUM(c.number_of_persons_injured) * 1.5) +
   (COUNT(c.cartodb_id) * 0.75)) as dval,
  SUM(CASE WHEN c.number_of_persons_injured > 0 THEN 1 ELSE 0 END) AS total_crashes_with_injury,
  SUM(CASE WHEN c.number_of_persons_killed > 0 THEN 1 ELSE 0 END) AS total_crashes_with_death
FROM
  table_20k_crashes c
JOIN
  :geo-table a
ON
  ST_Within(c.the_geom, a.the_geom)
WHERE
  (date <= date ':end-date')
AND
  (date >= date ':start-date')
AND
  (a.identifier = :identifier)
GROUP BY
  c.the_geom, c.latitude, c.longitude, c.on_street_name, c.cross_street_name
ORDER BY
  :order-col :order-dir
LIMIT 100

--name: intersections-by-date-area-with-order-filtered
--Select all intersections filtered by area and date and order by a col
SELECT
  concat_ws(',', c.latitude, c.longitude) as pos,
  concat_ws(',', c.on_street_name, c.cross_street_name) as streets,
  c.the_geom,
  COUNT(c.cartodb_id) as total_crashes,
  SUM(c.number_of_cyclist_injured) as cyclist_injured,
  SUM(c.number_of_cyclist_killed) as cyclist_killed,
  SUM(c.number_of_motorist_injured) as motorist_injured,
  SUM(c.number_of_motorist_killed) as motorist_killed,
  SUM(c.number_of_pedestrians_injured) as pedestrians_injured,
  SUM(c.number_of_pedestrians_killed) as pedestrians_killed,
  SUM(c.number_of_persons_injured) as persons_injured,
  SUM(c.number_of_persons_killed) as persons_killed,
  ((SUM(c.number_of_persons_killed) * 2.75) +
   (SUM(c.number_of_persons_injured) * 1.5) +
   (COUNT(c.cartodb_id) * 0.75)) as dval,
  SUM(CASE WHEN c.number_of_persons_injured > 0 THEN 1 ELSE 0 END) AS total_crashes_with_injury,
  SUM(CASE WHEN c.number_of_persons_killed > 0 THEN 1 ELSE 0 END) AS total_crashes_with_death
FROM
  table_20k_crashes c
JOIN
  :geo-table a
ON
  ST_Within(c.the_geom, a.the_geom)
WHERE
  (date <= date ':end-date')
AND
  (date >= date ':start-date')
AND
  (:filter-col > 0)
AND
  (a.identifier = :identifier)
GROUP BY
  c.the_geom, c.latitude, c.longitude, c.on_street_name, c.cross_street_name
ORDER BY
  :order-col :order-dir
LIMIT 100

--name: intersections-by-date-custom-area-with-order
--Select all intersections filtered by date and order by a col
SELECT
  concat_ws(',', c.latitude, c.longitude) as pos,
  concat_ws(',', c.on_street_name, c.cross_street_name) as streets,
  c.the_geom,
  COUNT(c.cartodb_id) as total_crashes,
  SUM(c.number_of_cyclist_injured) as cyclist_injured,
  SUM(c.number_of_cyclist_killed) as cyclist_killed,
  SUM(c.number_of_motorist_injured) as motorist_injured,
  SUM(c.number_of_motorist_killed) as motorist_killed,
  SUM(c.number_of_pedestrians_injured) as pedestrians_injured,
  SUM(c.number_of_pedestrians_killed) as pedestrians_killed,
  SUM(c.number_of_persons_injured) as persons_injured,
  SUM(c.number_of_persons_killed) as persons_killed,
  ((SUM(c.number_of_persons_killed) * 2.75) +
   (SUM(c.number_of_persons_injured) * 1.5) +
   (COUNT(c.cartodb_id) * 0.75)) as dval,
  SUM(CASE WHEN c.number_of_persons_injured > 0 THEN 1 ELSE 0 END) AS total_crashes_with_injury,
  SUM(CASE WHEN c.number_of_persons_killed > 0 THEN 1 ELSE 0 END) AS total_crashes_with_death
FROM
  table_20k_crashes c
WHERE
  (date <= date ':end-date')
AND
  (date >= date ':start-date')
AND
  (ST_Contains(:shape, c.the_geom))
GROUP BY
  c.the_geom, c.latitude, c.longitude, c.on_street_name, c.cross_street_name
ORDER BY
  :order-col :order-dir
LIMIT 100

--name: intersections-by-date-custom-area-with-order-filtered
--Select all intersections filtered by date and order by a col
SELECT
  concat_ws(',', c.latitude, c.longitude) as pos,
  concat_ws(',', c.on_street_name, c.cross_street_name) as streets,
  c.the_geom,
  COUNT(c.cartodb_id) as total_crashes,
  SUM(c.number_of_cyclist_injured) as cyclist_injured,
  SUM(c.number_of_cyclist_killed) as cyclist_killed,
  SUM(c.number_of_motorist_injured) as motorist_injured,
  SUM(c.number_of_motorist_killed) as motorist_killed,
  SUM(c.number_of_pedestrians_injured) as pedestrians_injured,
  SUM(c.number_of_pedestrians_killed) as pedestrians_killed,
  SUM(c.number_of_persons_injured) as persons_injured,
  SUM(c.number_of_persons_killed) as persons_killed,
  ((SUM(c.number_of_persons_killed) * 2.75) +
   (SUM(c.number_of_persons_injured) * 1.5) +
   (COUNT(c.cartodb_id) * 0.75)) as dval,
  SUM(CASE WHEN c.number_of_persons_injured > 0 THEN 1 ELSE 0 END) AS total_crashes_with_injury,
  SUM(CASE WHEN c.number_of_persons_killed > 0 THEN 1 ELSE 0 END) AS total_crashes_with_death
FROM
  table_20k_crashes c
WHERE
  (date <= date ':end-date')
AND
  (date >= date ':start-date')
AND
  (:filter-col > 0)
AND
  (ST_Contains(:shape, c.the_geom))
GROUP BY
  c.the_geom, c.latitude, c.longitude, c.on_street_name, c.cross_street_name
ORDER BY
  :order-col :order-dir
LIMIT 100
