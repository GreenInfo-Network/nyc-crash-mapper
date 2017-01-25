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
    // update the cartoLayer using new props, such as start and end dates
    this.updateCartoLayer(nextProps);
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
    this.map = L.map(this.mapDiv, {
      center: [40.687, -73.982],
      zoom: 12,
      zoomControl: false,
      scrollWheelZoom: false
    });

    L.tileLayer(basemapURL, {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;<a href="https://carto.com/attribution">CARTO</a>'
    }).addTo(self.map);

    this.initCartoLayer();
  }

  initCartoLayer() {
    const self = this;
    const { startDate, endDate } = this.props;
    const startEndDates = { startDate, endDate };
    const layerSource = configureLayerSource(crashesByDate(startEndDates));
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
    const { startDate, endDate } = props;
    // TO DO: Logic for determining SQL query based on app filters
    this.cartoLayer.setSQL(
      crashesByDate({ startDate, endDate })
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

LeafletMap.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired
};

export default LeafletMap;
