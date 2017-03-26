// @flow
import cartocss from './cartocss';

// CARTO account name
export const cartoUser = 'chekpeds';

// CARTO SQL API endpoint
export const cartoSQLQuery = (query: string): string =>
  `https://${cartoUser}.carto.com/api/v2/sql?q=${query}`;

// CARTO table names lookup
export const cartoTables: {
  nyc_borough: string;
  nyc_city_council: string;
  nyc_community_board: string;
  nyc_neighborhood: string;
  nyc_nypd_precinct: string;
  nyc_zip_code: string;
  nyc_crashes: string
} = {
  nyc_borough: 'nyc_borough',
  nyc_city_council: 'nyc_city_council',
  nyc_community_board: 'nyc_community_board',
  nyc_neighborhood: 'nyc_neighborhood',
  nyc_nypd_precinct: 'nyc_nypd_precinct',
  nyc_zip_code: 'nyc_zip_code',
  nyc_crashes: 'crashes_all_prod'
};

export const crashDataFieldNames: Array<string> = [
  'total_crashes',
  'cyclist_injured',
  'cyclist_killed',
  'motorist_injured',
  'motorist_killed',
  'pedestrian_injured',
  'pedestrian_killed',
  'persons_killed',
  'persons_injured',
  'on_street_name',
  'cross_street_name'
];

// flow type, used in cartoLayerSource
type Sublayers = {
  sql: string;
  cartocss: string;
  interactivity: string
};

export const cartoLayerSource: {
  user_name: string;
  type: string;
  sublayers: Array<Sublayers>
} = {
  user_name: cartoUser,
  type: 'cartodb',
  sublayers: [{
    sql: '',
    cartocss,
    interactivity: crashDataFieldNames.join(','),
  }]
};

// basemap for Leaflet
export const basemapURL: string =
  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
