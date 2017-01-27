import React, { Component, PropTypes } from 'react';

import { crashesByDate } from '../../constants/sql_queries';
import { basemapURL } from '../../constants/app_config';
import { configureLayerSource } from '../../constants/api';
import ZoomControls from './ZoomControls';

class LeafletMap extends Component {
  constructor() {
    super();
    this.map = null;
    this.cartoLayer = null;
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
  }

  componentDidMount() {
    this.initMap();
  }

  componentWillReceiveProps(nextProps) {
    if (this.shouldCartoLayerUpdate(nextProps)) {
      // update the cartoLayer using new props, such as start and end dates
      this.updateCartoLayer(nextProps);
    }
  }

  shouldComponentUpdate() {
    // let Leaflet have control over this part of the DOM, not React.
    return false;
  }

  shouldCartoLayerUpdate(nextProps) {
    const { endDate, startDate, persona, harm } = nextProps;
    if (this.cartoLayer !== null) {
      if (startDate !== this.props.startDate ||
          endDate !== this.props.endDate ||
          persona !== this.props.persona ||
          harm !== this.props.harm) {
        return true;
      }
      return false;
    }
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
    const { startDate, endDate, persona, harm } = this.props;
    const sqlParams = { startDate, endDate, persona, harm };
    const layerSource = configureLayerSource(crashesByDate(sqlParams));
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
        layer.on('error', error =>
          console.warn(`layer interaction error: ${error}`));

        // store a reference to the Carto SubLayer so we can act upon it later,
        // mainly to update the SQL query based on filters applied by the user
        self.cartoLayer = layer.getSubLayer(0);
      })
      .on('error', (error) => {
        console.warn(`cartodb.createLayer error: ${error}`);
      });
  }

  updateCartoLayer(props) {
    const { startDate, endDate, persona, harm } = props;
    // TO DO: Logic for determining SQL query based on app filters
    this.cartoLayer.setSQL(
      crashesByDate({ startDate, endDate, persona, harm })
    );
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
  harm: PropTypes.string.isRequired,
  persona: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  zoom: PropTypes.number,
  lat: PropTypes.number,
  lng: PropTypes.number,
};

export default LeafletMap;
