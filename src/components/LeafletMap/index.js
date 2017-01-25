import React, { Component } from 'react';

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
    const startEndDates = {
      startDate: '2016-07-01',
      endDate: '2016-12-31'
    };
    const layerSource = configureLayerSource(crashesByDate(startEndDates));
    const options = {
      https: true,
      infowindow: false,
      legends: false,

    };

    // `cartodb` is a global var, refers to CARTO.JS: https://carto.com/docs/carto-engine/carto-js/
    // this creates the tile layer & utf grid for Leaflet
    cartodb.createLayer(self.map, layerSource, options)
      .addTo(self.map)
      .on('done', (layer) => {
        layer
          .on('featureOver', (e, latlng, pos, data) => {
            console.log(e, latlng, pos, data);
          })
          .on('error', error => console.warn(`layer interaction error: ${error}`));

        // store a reference to the Carto layer so we can act upon it later,
        // mainly to update the SQL query based on filters applied by the user
        self.cartoLayer = layer;
      })
      .on('error', (error) => {
        console.warn(`cartodb.createLayer error: ${error}`);
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

export default LeafletMap;
