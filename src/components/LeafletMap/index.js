import React, { Component, PropTypes } from 'react';
import momentPropTypes from 'react-moment-proptypes';
import sls from 'single-line-string';

import { configureMapSQL } from '../../constants/sql_queries';
import {
  basemapURL,
  cartoUser,
  crashDataFieldNames,
  labelFormats,
  geoPolygonStyle,
  intersectionCircleRadiusMeters,
  intersectionCircleStyle
} from '../../constants/app_config';
import { boroughs, configureLayerSource, crashDataChanged } from '../../constants/api';

import ZoomControls from './ZoomControls';
import CustomFilter from './customFilter';

class LeafletMap extends Component {
  constructor() {
    super();
    this.mapBounds = [[40.91553, -73.70002], [40.49613, -74.25559]];
    this.fitBoundsOptions = {
      paddingTopLeft: [60, 100],
      paddingBottomRight: [300, 120],
      maxZoom: 18
    };
    // styles to apply to custom draw poly overlay
    this.customDrawStyle = {
      color: '#17838f',
      fillOpacity: 0,
      weight: 2,
    };
    this.mapDiv = undefined; // div Leaflet mounts to
    this.map = undefined; // instance of L.map
    this.filterPolygons = undefined; // L.geoJson for selecting an geo area to filter by
    this.filterAreaTooltip = undefined; // div for tooltip for filter area polygons
    this.mapStatsDisclaimer = undefined;
    this.customDraw = undefined;
    this.cartoLayer = undefined;
    this.cartoSubLayer = undefined;
    this.cartodbSQL = undefined;
    this.cartoSubLayerTooltip = undefined;
    this.cartoInfowindow = undefined;
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
  }

  componentDidMount() {
    const { lngLats, geo, identifier } = this.props;
    this.cartodbSQL = new cartodb.SQL({ user: cartoUser });
    this.initMap();
    this.initCustomFilter();

    // if app loaded with an existing polygon from query params, add it to the drawlayer feat group
    if (lngLats && lngLats.length) {
      // reverse the coordinates [lng, lat] -> [lat, lng], because Leaflet :)
      const reversed = lngLats.reduce((acc, cur) => {
        acc.push([cur[1], cur[0]]);
        return acc;
      }, []);
      const poly = L.polygon(reversed, this.customDrawStyle);
      this.customDraw.drawLayer.addLayer(poly);
    }

    // if loading a geo but no identifier, fetch geo-polygons to start up
    // if loading both/neither, that's already handled by standard props updates
    if (geo && geo !== 'citywide' && !identifier) {
      this.props.fetchGeoPolygons(geo);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { geo, geojson, identifier, drawEnabeled, searchResult } = nextProps;

    if (identifier !== this.props.identifier) {
      // user filtered by a specific geography, so hide the GeoJSON boundary overlay
      if (identifier) {
        this.map.removeLayer(this.filterPolygons);
      } else {
        this.updateCartoSubLayer(nextProps);
      }
    }

    // user deselected a geo identifier, having had one selected previously
    // and is keeping the same geography type
    if ((!identifier && this.props.identifier) && (geo === this.props.geo)) {
      if (geojson.features.length) {
        this.renderFilterPolygons(geo, geojson);
      } else {
        this.props.fetchGeoPolygons(geo);
      }
    }

    if (crashDataChanged(this.props, nextProps)) {
      // if boundary filters were changed by user, update map data
      this.updateCartoSubLayer(nextProps);
    }

    if (geo === 'citywide' && this.props.geo !== 'citywide') {
      // user selected or deselected citywide filter, hide & show relevant overlays
      this.showMapStatsDisclaimer();
      this.hideFilterAreaPolygons();
      this.customFilterClearPoly();
    } else if (geo !== 'citywide') {
      this.hideMapStatsDisclaimer();
    }

    if (geo && (geo !== this.props.geo) && (geo !== 'citywide') && (geo !== 'custom')) {
      // cancel custom draw in case it was enabled
      this.customFilterCancelDraw();
      // clear custom area layer if it was drawn
      this.customFilterClearPoly();
      // make an API call for GeoJSON of boundary polygons
      this.props.fetchGeoPolygons(geo);
    }

    if (geojson && geojson.features && geojson.features.length) {
      if (
        (geojson.geoName !== this.props.geojson.geoName) ||
        (geo !== 'citywide' && this.props.geo === 'citywide') ||
        (geo !== 'custom' && this.props.geo === 'custom')
      ) {
        // show the user polygons for filter by area / boundary
        this.renderFilterPolygons(geo, geojson);
      }
    }

    if (geo === 'custom' && this.props.geo !== 'custom') {
      this.customFilterClearPoly();
      this.customFilterEnableDraw();
    }

    if (!drawEnabeled && this.props.drawEnabeled) {
      this.customFilterCancelDraw();
    } else if (drawEnabeled && !this.props.drawEnabeled) {
      // clear any existing custom drawn polygon before drawing another one
      this.customFilterClearPoly();
      this.customFilterEnableDraw();
    }

    // Handle Address Search Result
    // user searched for a street address, zoom and center the map, add a marker
    // eslint-disable-next-line
    if (searchResult && JSON.stringify(searchResult) !== JSON.stringify(this.props.searchResult)) {
      let { coordinates } = searchResult.geometry;
      coordinates = coordinates.reverse(); // because Leaflet...
      const { label } = searchResult.properties;
      this.map.setView(coordinates, 16);
      this.searchMarker = L.marker(coordinates)
        .bindPopup(`<p>${label}</p>`)
        .addTo(this.map);
      this.searchCircle = L.circle(coordinates,
        intersectionCircleRadiusMeters,
        intersectionCircleStyle)
        .addTo(this.map);
    }

    // remove marker if user cleared search result or applied filter by location
    if (!searchResult && this.props.searchResult) {
      this.map.removeLayer(this.searchMarker);
      this.map.removeLayer(this.searchCircle);
      this.searchMarker = null;
      this.searchCircle = null;
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
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(self.map);

    // update the URL query params with map zoom & center
    this.map.on('moveend', onMapMoved);

    this.initCartoLayer();
  }

  initCartoLayer() {
    const self = this;
    const layerSource = configureLayerSource(configureMapSQL(this.props));
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
        layer.on('loading', () => self.props.dataLoading(true));
        layer.on('load', () => self.props.dataLoading(false));
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
    self.cartoSubLayerTooltip = this.cartoLayer.leafletMap.viz.addOverlay({
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

  hideCartoTooltips() {
    this.cartoSubLayerTooltip.hide();
  }

  hideCartoInfowindow() {
    this.cartoInfowindow._closeInfowindow();
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

  updateCartoSubLayer(nextProps) {
    // create the new sql query string
    const sql = configureMapSQL(nextProps);
    // hide any visible tooltips
    this.hideFilterAreaTooltip();
    this.hideCartoTooltips();
    // hide any open infowindow
    this.hideCartoInfowindow();
    // fit the map extent to the queried data, unless that's Everything
    if (nextProps.geo && nextProps.identifier) {
      this.fitMapBounds(sql);
    }
    // set the cartoSubLayer to be interactive
    this.cartoSubLayer.setInteraction(true);
    // update the cartoLayer SQL using new props, such as start and end dates
    this.cartoSubLayer.setSQL(sql);
  }

  initCustomFilter() {
    const { filterByAreaCustom } = this.props;
    this.customDraw = new CustomFilter();
    this.customDraw.mapInstance = this.map;
    this.customDraw.layerCreatedCallback = filterByAreaCustom;
    this.customDraw.polyStyle = this.customDrawStyle;
    this.customDraw.onLayerCreated();
    this.customDraw.initCustomFilterLayer();
    this.customDraw.initDrawPolygon();
  }

  customFilterEnableDraw() {
    this.cartoSubLayer.setInteraction(false);
    this.hideFilterAreaPolygons();
    this.hideFilterAreaTooltip();
    this.hideCartoTooltips();
    this.hideCartoInfowindow();
    this.customDraw.startDraw();
  }

  customFilterCancelDraw() {
    this.customDraw.cancelDraw();
    this.cartoSubLayer.setInteraction(true);
  }

  customFilterClearPoly() {
    this.customDraw.drawLayer.clearLayers();
  }

  showMapStatsDisclaimer() {
    this.mapStatsDisclaimer.style.display = '';
  }

  hideMapStatsDisclaimer() {
    this.mapStatsDisclaimer.style.display = 'none';
  }

  revealFilterAreaTooltip(geo, event) {
    const { containerPoint, target } = event;
    const { x, y } = containerPoint;
    const identifier = target.feature.properties.identifier;
    const p = this.filterAreaTooltip.children[0];

    this.filterAreaTooltip.style.cssText = `display: initial; top: ${(y - 25)}px; left: ${(x + 10)}px;`;

    // intersections have the ID|Name thing to split out
    // boroughs have a special lookup table for their label
    // and they all map onto a format string to make the labels read nicely
    let label = identifier;
    if (geo === 'borough') {
      label = boroughs[identifier];
    } else if (geo === 'intersection') {
      label = identifier.split('|')[0].split(', ')[1];  // see sql_queries.js where we concat the borough,ID|name
    }
    label = labelFormats[geo].replace('{}', label);

    p.textContent = label;
  }

  hideFilterAreaTooltip() {
    this.filterAreaTooltip.style.display = 'none';
  }

  hideFilterAreaPolygons() {
    // clear any existing geojson polygons that may be visible
    if (this.filterPolygons) {
      this.map.removeLayer(this.filterPolygons);
    }
  }

  renderFilterPolygons(geo, geojson) {
    const self = this;

    // functions to pass to L.geoJson.options.onEachFeature
    function handleMouseover(e) {
      const layer = e.target;

      layer.setStyle(geoPolygonStyle);

      self.revealFilterAreaTooltip(geo, e);

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    }

    function handleMouseout(e) {
      self.filterPolygons.resetStyle(e.target);
      self.hideFilterAreaTooltip();
    }

    function handleMousemove(e) {
      self.revealFilterAreaTooltip(geo, e);
    }

    function handleClick(e) {
      const target = e.target;
      let identifier = target.feature.properties.identifier;
      // use borough name string as the identifier, not number
      if (geo === 'borough') {
        identifier = boroughs[identifier];
      }
      self.cartoSubLayer.setInteraction(true);
      self.props.filterByAreaIdentifier(identifier);
    }

    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: handleMouseover,
        mouseout: handleMouseout,
        mousemove: handleMousemove,
        click: handleClick,
      });
    }

    // sets the default polygon style for filterPolygons
    function style() {
      return {
        fillColor: '#17838f',
        weight: 1,
        opacity: 1,
        color: '#fff',
        fillOpacity: 0.7
      };
    }

    /* disabled behavior; visually jarring to have the map jump around
    if (geo !== 'custom') {
      // for filter area polygons, fit map bounds to all of NYC
      this.map.fitBounds(this.mapBounds, this.mapBoundsOptions);
    }
    */

    // hide Carto sublayer tooltips / info windows & prevent interaction
    this.hideCartoTooltips();
    this.hideCartoInfowindow();
    this.cartoSubLayer.setInteraction(false);

    // clear any existing geojson polygons that may be visible
    this.hideFilterAreaPolygons();

    // set the geojson layer, store it, and add it to the map
    this.filterPolygons = L.geoJson(geojson, {
      onEachFeature,
      style,
    }).addTo(this.map);
  }

  render() {
    return (
      <div className="leaflet-map">
        <ZoomControls
          handleZoomIn={this.handleZoomIn}
          handleZoomOut={this.handleZoomOut}
        />
        <div ref={(_) => { this.mapStatsDisclaimer = _; }} className="map-stats-disclaimer">
          <p>
            <strong>Note:</strong> Map data may differ from stats below
            due to lack of location information provided by the NYPD.
          </p>
        </div>
        <div ref={(_) => { this.filterAreaTooltip = _; }} className="filter-area-tooltip">
          <p />
        </div>
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
  geojson: {},
  searchResult: null,
};

LeafletMap.propTypes = {
  onMapMoved: PropTypes.func.isRequired,
  dataLoading: PropTypes.func.isRequired,
  filterByAreaIdentifier: PropTypes.func.isRequired,
  filterByAreaCustom: PropTypes.func.isRequired,
  fetchGeoPolygons: PropTypes.func.isRequired,
  zoom: PropTypes.number,
  lat: PropTypes.number,
  lng: PropTypes.number,
  geo: PropTypes.string.isRequired,
  geojson: PropTypes.shape({
    type: PropTypes.string,
    features: PropTypes.array,
    geoName: PropTypes.string,
  }),
  identifier: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  lngLats: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number)
  ),
  drawEnabeled: PropTypes.bool.isRequired,
  startDate: momentPropTypes.momentObj.isRequired,
  endDate: momentPropTypes.momentObj.isRequired,
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
  searchResult: PropTypes.shape({
    properties: PropTypes.object,
    geometry: PropTypes.object,
    type: PropTypes.string
  }),
};

export default LeafletMap;
