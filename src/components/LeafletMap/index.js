import React, { Component, PropTypes } from 'react';
import sls from 'single-line-string';

import {
  configureMapSQL,
  filterAreaBtnTableMap,
  filterByAreaSQL
} from '../../constants/sql_queries';
import { basemapURL, cartoUser, crashDataFieldNames } from '../../constants/app_config';
import { configureLayerSource, crashDataChanged } from '../../constants/api';
import { filterAreaCartocss } from '../../constants/cartocss';
import ZoomControls from './ZoomControls';
import CustomFilter from './customFilter';

// helper function to create map sql using currently applied filters
const generateMapSQL = (props) => {
  const { startDate, endDate, filterType, geo, identifier, lngLats } = props;
  const params = { startDate, endDate, filterType, geo, identifier, lngLats };
  return configureMapSQL(params);
};

// helper to hide a carto sublayer's tooltip when switching from one sublayer to the next
const hideCartoTooltips = (tooltipClassName) => {
  if (tooltipClassName === 'crashes-layer') {
    const tooltipNode = document.querySelector(`.cartodb-tooltip-content-wrapper.${tooltipClassName}`).parentNode;
    tooltipNode.style.display = 'none';
  } else {
    const tooltipNodes = document.querySelectorAll(`.cartodb-tooltip-content-wrapper.${tooltipClassName}`);
    Array.prototype.forEach.call(tooltipNodes, (node) => {
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
    this.map = undefined;
    this.customDraw = undefined;
    this.cartoLayer = undefined;
    this.cartoSubLayer = undefined;
    this.cartoFilterSubLayers = {};
    this.cartodbSQL = undefined;
    this.cartoInfowindow = undefined;
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
  }

  componentDidMount() {
    this.cartodbSQL = new cartodb.SQL({ user: cartoUser });
    this.initMap();
    this.initCustomFilter();
  }

  componentWillReceiveProps(nextProps) {
    const { geo, lngLats } = nextProps;

    if (crashDataChanged(this.props, nextProps)) {
      this.updateCartoSubLayer(nextProps);
    }

    if (geo !== this.props.geo && geo !== 'Citywide' && geo !== 'Custom') {
      // show the user polygons for a filter Area
      this.renderFilterArea(geo);
    }

    if (geo === 'Custom' && this.props.geo !== 'Custom') {
      this.customFilterDraw();
    }

    if (lngLats && lngLats.length) {
      this.customDraw.drawLayer.clearLayers();
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

  initMap() {
    const self = this;
    const { zoom, lat, lng, onMapMoved } = this.props;
    this.map = L.map(this.mapDiv, {
      doubleClickZoom: false,
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
    // const layerSource = 'https://chekpeds.carto.com/api/v2/viz/acf2c4f6-e987-11e6-bfb2-0e233c30368f/viz.json';
    const options = {
      https: true,
      infowindow: true,
      legends: false,
    };

    // `cartodb` is a global var, refers to CARTO.JS: https://carto.com/docs/carto-engine/carto-js/
    // this creates the crash data tile layer & utf grid for Leaflet
    cartodb.createLayer(self.map, layerSource, options)
      .addTo(self.map)
      .on('done', (layer) => {
        self.cartoLayer = layer;
        layer.on('error', (error) => { throw error; });
        // store a reference to the Carto SubLayer so we can act upon it later,
        // mainly to update the SQL query based on filters applied by the user
        self.cartoSubLayer = layer.getSubLayer(0);
        // add tooltips to sublayer
        self.initCartoSubLayerTooltips();
        // add infowindows to sublayer
        self.initCartoSubLayerInfowindows();
      })
      .on('error', (error) => { throw error; });
  }

  initCartoSubLayerTooltips() {
    const self = this;
    const template = sls`
      <div class="cartodb-tooltip-content-wrapper crashes-layer">
        <p><span class="roboto-bold">Total Crashes</span>: {{total_crashes}}</p>
        <p><span class="roboto-bold">Total Persons Injured</span>: {{persons_injured}}</p>
        <p><span class="roboto-bold">Total Persons Killed</span>: {{persons_killed}}</p>
        <p>(Click for details)</p>
      </div>
    `;

    // add the tooltip to the crashes sublayer
    this.cartoLayer.leafletMap.viz.addOverlay({
      type: 'tooltip',
      layer: self.cartoSubLayer,
      template,
      position: 'bottom|right',
      fields: [
        { total_crashes: 'Total Crashes' },
        { persons_injured: 'persons injured' },
        { persons_killed: 'persons killed' }
      ]
    });
  }

  initCartoSubLayerInfowindows() {
    const self = this;
    const infowindowTemplate = document.getElementById('infowindow_template').innerHTML;
    self.cartoInfowindow = cdb.vis.Vis.addInfowindow(
      self.map,
      self.cartoSubLayer,
      crashDataFieldNames,
      {
        infowindowTemplate,
        templateType: 'mustache',
      }
    );
  }

  hideShowCartoInfowindow() {
    // const self = this;
    // this.cartoInfowindow.trigger('change:visibility', self.cartoInfowindow.toggle, {});
    this.cartoInfowindow.$el.hide();
  }

  fitMapBounds(sql) {
    // sets the map center & zoom to bounding box of crash data
    // returned by the current SQL query
    const self = this;
    self.cartodbSQL.getBounds(sql)
      .done((bounds) => {
        self.map.fitBounds(bounds, self.fitBoundsOptions);
        self.hideShowCartoInfowindow();
      });
  }

  updateCartoSubLayer(nextProps) {
    // create the new sql query string
    const sql = generateMapSQL(nextProps);
    // hide any visible filter sublayer
    this.hideFilterSublayers();
    // hide any previously visible tooltips from filter sublayer
    hideCartoTooltips('filter-layer');
    // hide any open infowindow
    this.hideShowCartoInfowindow();
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

  initCustomFilter() {
    const { filterByAreaCustom } = this.props;
    this.customDraw = new CustomFilter();
    this.customDraw.mapInstance = this.map;
    this.customDraw.layerCreatedCallback = filterByAreaCustom;
    this.customDraw.onLayerCreated();
    this.customDraw.initCustomFilterLayer();
  }

  customFilterDraw() {
    this.cartoSubLayer.setInteraction(false);
    hideCartoTooltips('crashes-layer');
    this.customDraw.initDraw();
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
    // temporarily disable cartoSubLayer infowindow
    this.hideShowCartoInfowindow();
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
  identifier: '',
  lngLats: [],
};

LeafletMap.propTypes = {
  onMapMoved: PropTypes.func.isRequired,
  filterByAreaIdentifier: PropTypes.func.isRequired,
  filterByAreaCustom: PropTypes.func.isRequired,
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
  lngLats: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number)
  ),
};

export default LeafletMap;
