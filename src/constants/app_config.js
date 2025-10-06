import cartocss from './cartocss';

// CARTO account name
export const cartoUser = 'chekpeds';

// CARTO SQL API endpoint
export const cartoSQLQuery = (query, format) =>
  `https://${cartoUser}.carto.com/api/v2/sql?${format === 'geojson' ? 'format=GeoJSON&' : ''}q=${query}`;

// CARTO table names lookup
export const cartoTables = {
  nyc_borough: 'nyc_borough',
  nyc_city_council: 'nyc_city_council',
  nyc_community_board: 'nyc_community_board',
  nyc_neighborhood: 'nyc_neighborhood',
  nyc_nypd_precinct: 'nyc_nypd_precinct',
  nyc_assembly: 'nyc_assembly',
  nyc_senate: 'nyc_senate',
  nyc_intersections: 'nyc_highcrash_intersections',
  nyc_crashes: 'crashes_all_prod'
};

export const crashDataFieldNames = [
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

export const cartoLayerSource = {
  user_name: cartoUser,
  type: 'cartodb',
  sublayers: [{
    sql: '',
    cartocss,
    interactivity: crashDataFieldNames.join(','),
  }]
};

// basemap for Leaflet
export const basemapURL =
  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';

// mapping of selectable area types onto a format string, for labels and tooltips
// "NYPD Precinct 107" is nicer than "107"
// use {} as the placeholder for the one value to be passed: the identifier
export const labelFormats = {
  borough: '{}',
  city_council: 'City Council District {}',
  community_board: 'Community Board {}',
  assembly: 'Assembly District {}',
  senate: 'Senate District {}',
  neighborhood: '{}',
  nypd_precinct: 'NYPD Precinct {}',
  intersection: '{}',
};
