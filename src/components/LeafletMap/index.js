import React, { Component, PropTypes } from 'react';
import sls from 'single-line-string';

import {
  configureMapSQL,
  filterAreaBtnTableMap,
  filterByAreaSQL
} from '../../constants/sql_queries';
import { basemapURL, cartoUser } from '../../constants/app_config';
import { configureLayerSource, crashDataChanged } from '../../constants/api';
import { filterAreaCartocss } from '../../constants/cartocss';
import ZoomControls from './ZoomControls';

// helper function to create map sql using currently applied filters
const generateMapSQL = (props) => {
  const { startDate, endDate, filterType, geo, identifier } = props;
  const params = { startDate, endDate, filterType, geo, identifier };
  return configureMapSQL(params);
};

// helper to hide a carto sublayer's tooltip when switching from one sublayer to the next
const hideCartoTooltips = (tooltipClassName) => {
  if (tooltipClassName === 'crashes-layer') {
    const tooltipNode = document.querySelector(`.cartodb-tooltip-content-wrapper.${tooltipClassName}`).parentNode;
    tooltipNode.style.display = 'none';
  } else {
    const tooltipNodes = document.querySelectorAll(`.cartodb-tooltip-content-wrapper.${tooltipClassName}`);
    tooltipNodes.forEach((node) => {
      const parent = node.parentNode;
      parent.style.display = 'none';
    });
  }
};

class LeafletMap extends Component {
  constructor() {
    super();
    this.mapBounds = [[40.91553, -73.70002], [40.49613, -74.25559]];
    this.fitBoundsOptions = {
      paddingTopLeft: [60, 100],
      paddingBottomRight: [300, 120],
      maxZoom: 18
    };
    this.map = null;
    this.cartoLayer = null;
    this.cartoSubLayer = null;
    this.cartoFilterSubLayers = {};
    this.cartodbSQL = null;
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
  }

  componentDidMount() {
    this.cartodbSQL = new cartodb.SQL({ user: cartoUser });
    this.initMap();
  }

  componentWillReceiveProps(nextProps) {
    const { geo } = nextProps;

    if (crashDataChanged(this.props, nextProps)) {
      this.updateCartoSubLayer(nextProps);
    }

    if (geo !== this.props.geo && geo !== 'Citywide' && geo !== 'Custom') {
      // show the user polygons for a filter Area
      this.renderFilterArea(geo);
    }

    if (geo === 'Custom') {
      // TO DO...
    }
  }

  shouldComponentUpdate() {
    // let Leaflet have control over this part of the DOM, not React.
    return false;
  }

  handleZoomIn() {
    this.map.zoomIn();
  }

  handleZoomOut() {
    this.map.zoomOut();
  }

  fitMapBounds(sql) {
    // sets the map center & zoom to bounding box of crash data
    // returned by the current SQL query
    const self = this;
    self.cartodbSQL.getBounds(sql)
      .done((bounds) => {
        self.map.fitBounds(bounds, self.fitBoundsOptions);
      });
  }

  initMap() {
    const self = this;
    const { zoom, lat, lng, onMapMoved } = this.props;
    this.map = L.map(this.mapDiv, {
      center: [lat, lng],
      zoom,
      maxZoom: 18,
      zoomControl: false,
      scrollWheelZoom: false
    });

    L.tileLayer(basemapURL, {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;<a href="https://carto.com/attribution">CARTO</a>'
    }).addTo(self.map);

    // update the URL query params with map zoom & center
    this.map.on('moveend', onMapMoved);

    this.initCartoLayer();
  }

  initCartoLayer() {
    const self = this;
    const layerSource = configureLayerSource(generateMapSQL(this.props));
    const options = {
      https: true,
      infowindow: false,
      legends: false,
    };

    // `cartodb` is a global var, refers to CARTO.JS: https://carto.com/docs/carto-engine/carto-js/
    // this creates the crash data tile layer & utf grid for Leaflet
    cartodb.createLayer(self.map, layerSource, options)
      .addTo(self.map)
      .on('done', (layer) => {
        self.cartoLayer = layer;
        layer.on('error', error =>
          console.warn(`layer interaction error: ${error}`));
        // store a reference to the Carto SubLayer so we can act upon it later,
        // mainly to update the SQL query based on filters applied by the user
        self.cartoSubLayer = layer.getSubLayer(0);
        // add tooltips to sublayer
        self.initCartoSubLayerTooltips();
      })
      .on('error', (error) => {
        console.warn(`cartodb.createLayer error: ${error}`);
      });
  }

  initCartoSubLayerTooltips() {
    const self = this;
    const template = sls`
      <div class="cartodb-tooltip-content-wrapper crashes-layer">
        <p><span class="roboto-bold">Cyclists Injured</span>: {{cyclist_injured}}</p>
        <p><span class="roboto-bold">Cyclists Killed</span>: {{cyclist_killed}}</p>
        <p><span class="roboto-bold">Motorists Injured</span>: {{motorist_injured}}</p>
        <p><span class="roboto-bold">Motorists Killed</span>: {{motorist_killed}}</p>
        <p><span class="roboto-bold">Pedestrians Injured</span>: {{pedestrian_injured}}</p>
        <p><span class="roboto-bold">Persons Injured</span>: {{persons_injured}}</p>
        <p><span class="roboto-bold">Persons Killed</span>: {{persons_killed}}</p>
        <p><span class="roboto-bold">On Street Name</span>: {{on_street_name}}</p>
        <p><span class="roboto-bold">Cross Street Name</span>: {{cross_street_name}}</p>
      </div>
    `;

    // add the tooltip to the crashes sublayer
    this.cartoLayer.leafletMap.viz.addOverlay({
      type: 'tooltip',
      layer: self.cartoSubLayer,
      template,
      position: 'bottom|right',
      fields: [
        { cyclist_injured: 'Cyclists Injured' },
        { cyclist_killed: 'Cyclists Killed' },
        { motorist_injured: 'Motorists Injured' },
        { motorist_killed: 'Motorists Killed' },
        { pedestrian_injured: 'pedestrian injured' },
        { pedestrian_killed: 'pedestrian killed' },
        { persons_injured: 'persons injured' },
        { persons_killed: 'persons killed' },
        { on_street_name: 'on street name' },
        { cross_street_name: 'cross street name' },
      ]
    });
  }

  updateCartoSubLayer(nextProps) {
    // create the new sql query string
    const sql = generateMapSQL(nextProps);
    // hide any visible filter sublayer
    this.hideFilterSublayers();
    // hide any previously visible tooltips from filter sublayer
    hideCartoTooltips('filter-layer');
    // fit the map extent to the queried data
    this.fitMapBounds(sql);
    // set the cartoSubLayer to be interactive
    this.cartoSubLayer.setInteraction(true);
    // update the cartoLayer SQL using new props, such as start and end dates
    this.cartoSubLayer.setSQL(sql);
  }

  hideFilterSublayers() {
    Object.keys(this.cartoFilterSubLayers).forEach((sublayer) => {
      this.cartoFilterSubLayers[sublayer].hide();
    });
  }

  initFilterLayerTooltips(geo) {
    // geo comes from nextProps so must be passed as a parameter
    const self = this;
    const labelMappings = {
      Borough: '{{borough}}',
      'Community Board': '<span>CB</span> {{identifier}}',
      'City Council District': '<span>CD</span> {{identifier}}',
      'Neighborhood (NTA)': '{{identifier}}',
      'NYPD Precinct': '<span>NYPD Precinct</span> {{identifier}}',
      'Zipcode (ZCTA)': '<span>Zipcode</span> {{identifier}}'
    };
    const template = sls`
      <div class="cartodb-tooltip-content-wrapper filter-layer">
        <p>${labelMappings[geo]}</p>
      </div>
    `;

    this.cartoLayer.leafletMap.viz.addOverlay({
      type: 'tooltip',
      layer: self.cartoFilterSubLayers[geo],
      template,
      position: 'bottom|right',
      fields: [
        { borough: 'borough' },
        { identifier: 'identifier' }
      ]
    });
  }

  renderFilterArea(geo) {
    // renders the Carto subLayer for a boundary geometry which the user may
    // click on to filter data by
    const self = this;
    const { filterByAreaIdentifier } = this.props;
    const table = filterAreaBtnTableMap[geo];
    const cartocss = filterAreaCartocss(table);
    const sql = filterByAreaSQL[geo];
    const interactivity = sql.indexOf('borough') > -1 ? ['cartodb_id', 'borough', 'identifier'] : ['cartodb_id', 'identifier'];

    // hide any visible filter sublayer
    this.hideFilterSublayers();
    // temporarily disable cartoSubLayer tooltips
    hideCartoTooltips('crashes-layer');
    // temporarily disable cartoSubLayer interactivity
    this.cartoSubLayer.setInteraction(false);

    if (geo !== 'Custom') {
      // for filter area polygons, fit map bounds to the entire city
      this.map.fitBounds(this.mapBounds, this.mapBoundsOptions);
    }

    if (this.cartoFilterSubLayers[geo]) {
      // if the filter sublayer is already stored then show it
      this.cartoFilterSubLayers[geo].show();
      this.cartoFilterSubLayers[geo].setInteraction(true);
    } else {
      // store the filter sublayer
      this.cartoFilterSubLayers[geo] = this.cartoLayer.createSubLayer({
        sql,
        cartocss,
        interactivity
      });

      this.cartoFilterSubLayers[geo].setInteraction(true);
      // add tooltips for filter layer
      this.initFilterLayerTooltips(geo);
      // set up a click handler on the cartoFilterSubLayer
      this.cartoFilterSubLayers[geo].on('featureClick', (e, latlng, pos, data) => {
        const { identifier } = data;
        self.cartoSubLayer.setInteraction(true);
        filterByAreaIdentifier(identifier);
      });
    }
  }

  render() {
    return (
      <div className="leaflet-map">
        <ZoomControls
          handleZoomIn={this.handleZoomIn}
          handleZoomOut={this.handleZoomOut}
        />
        <div ref={(_) => { this.mapDiv = _; }} id="map" />
      </div>
    );
  }
}

LeafletMap.defaultProps = {
  zoom: 12,
  lat: 40.687,
  lng: -73.982,
  identifier: undefined,
};

LeafletMap.propTypes = {
  onMapMoved: PropTypes.func.isRequired,
  filterByAreaIdentifier: PropTypes.func.isRequired,
  zoom: PropTypes.number,
  lat: PropTypes.number,
  lng: PropTypes.number,
  geo: PropTypes.string.isRequired,
  identifier: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  filterType: PropTypes.shape({
    fatality: PropTypes.shape({
      cyclist: PropTypes.bool.isRequired,
      motorist: PropTypes.bool.isRequired,
      pedestrian: PropTypes.bool.isRequired,
    }).isRequired,
    injury: PropTypes.shape({
      cyclist: PropTypes.bool.isRequired,
      motorist: PropTypes.bool.isRequired,
      pedestrian: PropTypes.bool.isRequired,
    }).isRequired,
    noInjuryFatality: PropTypes.bool.isRequired
  }).isRequired,
};

export default LeafletMap;
