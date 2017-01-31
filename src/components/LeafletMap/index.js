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
  const { startDate, endDate, filterType } = props;
  const params = { startDate, endDate, filterType };
  return configureMapSQL(params);
};

class LeafletMap extends Component {
  constructor() {
    super();
    this.map = null;
    this.cartoLayer = null;
    this.cartoSubLayer = null;
    this.cartoFilterSubLayer = null;
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
      const sql = generateMapSQL(nextProps);
      // fit the map extent to the queried data
      this.fitMapBounds(sql);
      // update the cartoLayer SQL using new props, such as start and end dates
      this.cartoSubLayer.setSQL(sql);
    }
    if (geo !== this.props.geo && geo !== 'Citywide' && geo !== 'Custom') {
      this.renderFilterArea(geo);
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
        self.map.fitBounds(bounds, {
          paddingTopLeft: [60, 100],
          paddingBottomRight: [300, 120],
          maxZoom: 18
        });
      });
  }

  initMap() {
    const self = this;
    const { zoom, lat, lng, onMapMoved } = this.props;
    this.map = L.map(this.mapDiv, {
      center: [lat, lng],
      zoom,
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

        const template = sls`
          <div class="cartodb-tooltip-content-wrapper">
            <p><span class="roboto-bold">Cyclists Injured</span>: {{cyclist_injured}}</p>
            <p><span class="roboto-bold">Cyclists Killed</span>: {{cyclist_killed}}</p>
            <p><span class="roboto-bold">Motorists Injured</span>: {{motorist_injured}}</p>
            <p><span class="roboto-bold">Motorists Killed</span>: {{motorist_killed}}</p>
            <p><span class="roboto-bold">Pedestrians Injured</span>: {{pedestrian_injured}}</p>
            <p><span class="roboto-bold">Pedestrians Killed</span>: {{pedestrian_killed}}</p>
            <p><span class="roboto-bold">On Street Name</span>: {{on_street_name}}</p>
            <p><span class="roboto-bold">Cross Street Name</span>: {{cross_street_name}}</p>
          </div>
        `;

        // add the tooltip
        layer.leafletMap.viz.addOverlay({
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
            { on_street_name: 'on street name' },
            { cross_street_name: 'cross street name' },
          ]
        });
      })
      .on('error', (error) => {
        console.warn(`cartodb.createLayer error: ${error}`);
      });
  }

  renderFilterArea(geo) {
    // renders the Carto subLayer for a boundary geometry which the user may
    // click on to filter data by
    const { filterByAreaIdentifier } = this.props;
    const table = filterAreaBtnTableMap[geo];
    const cartocss = filterAreaCartocss(table);
    const sql = filterByAreaSQL[geo];
    const interactivity = ['cartodb_id', 'identifier'];

    this.fitMapBounds(sql);

    this.cartoFilterSubLayer = this.cartoLayer.createSubLayer({
      sql,
      cartocss,
      interactivity
    });

    // set up a click handler on the cartoFilterSubLayer to fire the filterByAreaIdentifier
    // action with identifier of the polygon the user clicked on
    // TO DO: first check if filter area sublayer already exists
    // TO DO: remove / hide filter area sublayer if user selects another
    this.cartoFilterSubLayer.setInteraction(true);
    this.cartoFilterSubLayer.on('featureClick', (e, latlng, pos, data) => {
      const { identifier } = data;
      filterByAreaIdentifier(identifier);
    });
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
};

LeafletMap.propTypes = {
  onMapMoved: PropTypes.func.isRequired,
  filterByAreaIdentifier: PropTypes.func.isRequired,
  zoom: PropTypes.number,
  lat: PropTypes.number,
  lng: PropTypes.number,
  geo: PropTypes.string.isRequired,
  // startDate: PropTypes.string.isRequired,
  // endDate: PropTypes.string.isRequired,
  // filterType: PropTypes.shape({
  //   fatality: PropTypes.shape({
  //     cyclist: PropTypes.bool.isRequired,
  //     motorist: PropTypes.bool.isRequired,
  //     pedestrian: PropTypes.bool.isRequired,
  //   }).isRequired,
  //   injury: PropTypes.shape({
  //     cyclist: PropTypes.bool.isRequired,
  //     motorist: PropTypes.bool.isRequired,
  //     pedestrian: PropTypes.bool.isRequired,
  //   }).isRequired,
  //   noInjuryFatality: PropTypes.bool.isRequired
  // }).isRequired,
};

export default LeafletMap;
