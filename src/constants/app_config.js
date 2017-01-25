import cartocss from './cartocss';

// CARTO account name
export const cartoUser = 'chekpeds';

// CARTO SQL API endpoint
export const cartoSQLQuery = query =>
  `https://${cartoUser}.carto.com/api/v2/sql?q=${query}`;

// CARTO table names lookup
export const cartoTables = {
  nyc_borough: 'nyc_borough',
  nyc_city_council: 'nyc_city_council',
  nyc_community_board: 'nyc_community_board',
  nyc_neighborhood: 'nyc_neighborhood',
  nyc_nypd_precinct: 'nyc_nypd_precinct',
  nyc_zip_code: 'nyc_zip_code',
  nyc_crashes: 'export2016_07'
};

export const crashDataFieldNames = [
  'cyclist_injured',
  'cyclist_killed',
  'motorist_injured',
  'motorist_killed',
  'pedestrians_injured',
  'pedestrians_killed',
  'persons_injured',
  'persons_killed',
  'on_street_name',
  'cross_street_name'
];

export const cartoLayerSource = {
  user_name: cartoUser,
  type: 'cartodb',
  sublayers: [{
    sql: '',
    cartocss,
    interactivity: crashDataFieldNames,
  }]
};

// basemap for Leaflet
export const basemapURL =
  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
