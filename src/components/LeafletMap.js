import React, { Component } from 'react';

class LeafletMap extends Component {

  componentDidMount() {
    this.initMap();
  }

  shouldComponentUpdate() {
    // let Leaflet have control over this part of the DOM
    return false;
  }

  initMap() {
    const map = L.map(this.mapDiv, {
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
    }).addTo(map);
  }

  render() {
    return (
      <div className="leaflet-map">
        <div ref={(_) => { this.mapDiv = _; }} id="map" />
      </div>
    );
  }
}

export default LeafletMap;
