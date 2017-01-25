// CARTO account name
cartoUser = 'chekpeds';

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

// basemap for Leaflet
export const basemapURL =
  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';