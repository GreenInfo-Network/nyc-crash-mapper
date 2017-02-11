#!/usr/bin/env python

import requests
import urllib
from datetime import datetime
import json

CARTO_USER_NAME = 'chekpeds'
CARTO_CRASHES_TABLE = 'dump_2011_2012'
CARTO_SQL_API_BASEURL = 'https://%s.carto.com/api/v2/sql?q=' % CARTO_USER_NAME

def get_max_date_from_carto():
  """
  Makes a GET request to the CARTO SQL API and returns the latest date
  from the crash data table as a datetime.date object.
  """
  query='SELECT max(date_val) as latest_date FROM %s' % CARTO_CRASHES_TABLE
  url = CARTO_SQL_API_BASEURL + urllib.quote(query, safe='')

  try:
    r = requests.get(url)
  except requests.exceptions.RequestException as e:
    print e
    sys.exit(1)

  datestring = r.json()['rows'][0]['latest_date']
  return datetime.strptime(datestring, '%Y-%m-%dT%H:%M:%SZ')

def get_collision_data(dateobj):
  """
  Makes a GET request to the Socrata API for the latest collision data
  using the date
  """
  datestring = dateobj.strftime('%Y-%m-%d')
  baseurl = "https://data.cityofnewyork.us/resource/qiz3-axqb.json?"
  query = {
    '$where': 'date > \'%s\'' % datestring,
    '$order': 'date DESC'
    }
  url = baseurl + urllib.urlencode(query)

  try:
    r = requests.get(url)
  except requests.exceptions.RequestException as e:
    print e
    sys.exit(1)

  return r.json()

def parse_response(json):
  """
  Parses the JSON response from the Socrata API
  """


def main():
  print(json.dumps(get_collision_data(get_max_date_from_carto())))

if __name__ == '__main__':
  main()
