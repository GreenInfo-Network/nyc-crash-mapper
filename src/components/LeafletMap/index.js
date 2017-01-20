import React, { Component } from 'react';

import ZoomControls from './ZoomControls';

class LeafletMap extends Component {
  constructor() {
    super();
    this.map = null;
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
  }

  componentDidMount() {
    this.initMap();
  }

  shouldComponentUpdate() {
    // let Leaflet have control over this part of the DOM
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

    // TO DO: move url for tileLayer to a config file
    const url = 'http://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
    L.tileLayer(url, {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;<a href="https://carto.com/attribution">CARTO</a>'
    }).addTo(self.map);
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
