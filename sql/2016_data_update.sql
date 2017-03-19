--- Updating 2016 crashes data in CARTO
--- The NYPD deleted and updated rows in Socrata for 2016 sometime in early 2017,
--- requiring a db update in CARTO
--- This may happen for future years as well, so documenting the process here

--- When imported into CARTO, a value for the "contributing_factor" field may look like:
--- {"Driver Inattention/Distraction",Unspecified}
--- Getting CARTO to recognize "contributing_factor" as an array type requires
--- doing a find and replace, then converting the column type to text array

--- Note that SQL queries in CARTO do not require a trailing semicolon except
--- in the case of running multiple queries in a row.

--- Remove curly braces
UPDATE crashes_2016_to_2017
SET contributing_factor = replace(contributing_factor, '{', '');

UPDATE crashes_2016_to_2017
SET contributing_factor = replace(contributing_factor, '}', '');

UPDATE crashes_2016_to_2017
SET vehicle_type = replace(vehicle_type, '{', '');

UPDATE crashes_2016_to_2017
SET vehicle_type = replace(vehicle_type, '}', '');

-- Remove double quotes
UPDATE crashes_2016_to_2017
SET contributing_factor = replace(contributing_factor, '"', '');

UPDATE crashes_2016_to_2017
SET vehicle_type = replace(vehicle_type, '"', '');

--- Convert data type from text to text array
ALTER TABLE crashes_2016_to_2017
ALTER contributing_factor type text[] using array[string_to_array(contributing_factor, ',', '')];

ALTER TABLE crashes_2016_to_2017
ALTER vehicle_type type text[] using array[string_to_array(vehicle_type, ',', '')];

--- Drop rows in master crashes table for 2016 & early 2017
DELETE FROM crashes_all_prod
WHERE date_val >= date '2016-01-01' AND date_val <= '2017-02-26';

--- Insert updated data into the master crashes table
INSERT INTO crashes_all_prod
(the_geom, borough, contributing_factor, crash_count, cross_street_name, date_val, latitude, longitude,
 month, number_of_cyclist_injured, number_of_cyclist_killed, number_of_motorist_injured,
 number_of_motorist_killed, number_of_pedestrian_injured, number_of_pedestrian_killed,
 number_of_persons_injured, number_of_persons_killed, off_street_name, on_street_name,
 socrata_id, unique_key, vehicle_type, year, zip_code)
SELECT
the_geom, borough, contributing_factor, crash_count, cross_street_name, date_val, latitude, longitude,
 month, number_of_cyclist_injured, number_of_cyclist_killed, number_of_motorist_injured,
 number_of_motorist_killed, number_of_pedestrian_injured, number_of_pedestrian_killed,
 number_of_persons_injured, number_of_persons_killed, off_street_name, on_street_name,
 socrata_id, unique_key, vehicle_type, year, zip_code
FROM crashes_2016_to_2017;

--- Double check it worked!
SELECT count(*) FROM crashes_all_prod WHERE date_val >= date '2016-01-01' AND date_val <= '2017-02-26';
--- 258082

--- After doing this create a copy of the production table as a backup and lock it in the CARTO dashboard
