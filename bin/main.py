#!/usr/bin/env python

import requests
import urllib
from datetime import datetime
import json
import logging
import sys

logging.basicConfig(
    level=logging.INFO,
    format=' %(asctime)s - %(levelname)s - %(message)s',
    datefmt='%I:%M:%S %p')
logger = logging.getLogger()

CARTO_USER_NAME = 'chekpeds'
CARTO_CRASHES_TABLE = 'etl_test'
CARTO_SQL_API_BASEURL = 'https://%s.carto.com/api/v2/sql?q=' % CARTO_USER_NAME


def get_max_date_from_carto():
  """
  Makes a GET request to the CARTO SQL API and returns the latest date
  from the crash data table as a datetime.date object. We only want data from
  the SODA API that is not in our crashes table, so we use this date for a where
  clause filter when requesting data from SODA API
  """
  query='SELECT max(date_val) as latest_date FROM %s' % CARTO_CRASHES_TABLE
  url = CARTO_SQL_API_BASEURL + urllib.quote(query, safe='')
  logger.info('Getting latest date from table %s...' % CARTO_CRASHES_TABLE)

  try:
    r = requests.get(url)
  except requests.exceptions.RequestException as e:
    logger.error(e.message)
    sys.exit(1)

  data = r.json()
  print(json.dumps(data))

  if 'rows' in data:
    datestring = data['rows'][0]['latest_date']
    latest_date = datetime.strptime(datestring, '%Y-%m-%dT%H:%M:%SZ')
    logger.info('Latest date from table %s is %s' % (CARTO_CRASHES_TABLE, latest_date))
  else:
    logger.error('No rows in response from %s' % CARTO_CRASHES_TABLE, json.dumps(data))
    sys.exit(1)

  return latest_date


def get_soda_data(dateobj):
  """
  Makes a GET request to the Socrata SODA API for the latest collision data
  using a `where date > dateobj` filter in the request.
  """
  datestring = dateobj.strftime('%Y-%m-%d')
  baseurl = "https://data.cityofnewyork.us/resource/qiz3-axqb.json?"
  query = {
    '$where': 'date > \'%s\'' % datestring,
    '$order': 'date DESC',
    '$limit': '5'
    }
  url = baseurl + urllib.urlencode(query)
  logger.info('Getting latest collision data from Socrata SODA API...')

  try:
    r = requests.get(url)
  except requests.exceptions.RequestException as e:
    logger.error(e.message)
    sys.exit(1)

  if (len(r.json()) > 0):
    format_soda_response(r.json())
  else:
    logger.info('No new data from Socrata, exiting.')
    sys.exit()


def format_postgres_array(values, field_name):
  """
  Takes a optional number of values and converts them to a string formatted
  for a postgres text array. All fields for contributing_factor or vehicle_type
  are joined into a single string surrounded by {}
  """
  tmp_list = []
  field_name_base = ''
  if (field_name == 'contributing_factor'):
    field_name_base = 'contributing_factor_vehicle_'
  elif (field_name == 'vehicle_type'):
    field_name_base = 'vehicle_type_code_'
  else:
    logger.info('format_postgres_array must take a valid field name type, %s provided' % field_name)
    sys.exit(1)

  for i in range(1, 6):
    field_name_full = "{0}{1}".format(field_name_base, i)
    if field_name_full in values:
      tmp_list.append(values[field_name_full])

  return "{%s}" % ','.join(tmp_list)


def format_soda_response(data):
  """
  Transforms the JSON SODA response into rows for the SQL insert query
  """
  logger.info('Processing {} rows from SODA API.'.format(len(data)))
  columns = """
    unique_key
    number_of_motorist_killed
    number_of_motorist_injured
    number_of_cyclist_killed
    number_of_cyclist_injured
    number_of_pedestrian_killed
    number_of_pedestrian_injured
    number_of_persons_killed
    number_of_persons_injured
    zip_code
    off_street_name
    cross_street_name
    on_street_name
    borough
    date_val
    longitude
    latitude
    geom
    vehicle_type
    contributing_factor
    year
    month
    crash_count
    socrata_id
  """

  vals = []
  for row in data:
    datestring = "%sT%s" % (row['date'].split('T')[0], row['time'])
    date_time = datetime.strptime(datestring, '%Y-%m-%dT%H:%M')

    if 'borough' in row:
      borough = row['borough']
    else:
      borough = ''

    if 'longitude' in row:
      lng = row['longitude']
    else:
      lng = None

    if 'latitude' in row:
      lat = row['latitude']
    else:
      lat = None

    if lat and lng:
      the_geom = "ST_GeomFromText('Point({0} {1})', 4326)".format(lng, lat)
    else:
      the_geom = 'null'
      lat = 'null'
      lng = 'null'

    if 'on_street_name' in row:
      on_street_name = row['on_street_name']
    else:
      on_street_name = ''

    if 'off_street_name' in row:
      off_street_name = row['off_street_name']
    else:
      off_street_name = ''

    if 'cross_street_name' in row:
      cross_street_name = row['cross_street_name']
    else:
      cross_street_name = ''

    if 'zip_code' in row:
      zipcode = row['zip_code']
    else:
      zipcode = ''

    contributing_factor = format_postgres_array(row, 'contributing_factor')
    vehicle_type = format_postgres_array(row, 'vehicle_type')

    val_string_tmp = []

    # creates the string "{1}, {2}, {3}, {4},..."
    for i in range(0, 23):
      if i < 8 or i == 14 or i == 15 or i > 18:
        val_string_tmp.append("{%d}" % i)
      else:
        val_string_tmp.append("'{%d}'" % i)

    val_string = '(' + ','.join(val_string_tmp) + ')'

    vals.append(val_string.format(
      row['number_of_motorist_killed'],
      row['number_of_motorist_injured'],
      row['number_of_cyclist_killed'],
      row['number_of_cyclist_injured'],
      row['number_of_pedestrians_killed'],
      row['number_of_pedestrians_injured'],
      row['number_of_persons_killed'],
      row['number_of_persons_injured'],
      zipcode,
      off_street_name,
      cross_street_name,
      on_street_name,
      borough,
      date_time.strftime('%Y-%m-%dT%H:%M%S'),
      lng,
      lat,
      the_geom,
      vehicle_type,
      contributing_factor,
      date_time.strftime('%Y'),
      date_time.strftime('%m'),
      '1',
      str(row['unique_key'])
    ))

  print(vals)

def main():
  get_soda_data(get_max_date_from_carto())

if __name__ == '__main__':
  main()
