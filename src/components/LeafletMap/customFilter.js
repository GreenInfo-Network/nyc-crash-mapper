class CustomFilter {
  constructor() {
    this.map = undefined;
    this.drawnItems = L.featureGroup();
    this.customLayer = undefined;
    this.poly = undefined;
    this.onLayerCreatedCB = () => {};
  }

  set mapInstance(obj) {
    this.map = obj;
  }

  set layerCreatedCallback(func) {
    if (func && typeof func === 'function') {
      this.onLayerCreatedCB = func;
    }
  }

  get drawLayer() {
    return this.drawnItems;
  }

  initCustomFilterLayer() {
    const self = this;
    this.customLayer = this.map.addLayer(self.drawnItems);
  }

  onLayerCreated() {
    const self = this;

    this.map.on(L.Draw.Event.CREATED, (e) => {
      const type = e.layerType;
      const layer = e.layer;

      if (type === 'polygon') {
        const geoJson = layer.toGeoJSON();
        const coordinates = geoJson.geometry.coordinates[0];
        self.onLayerCreatedCB(coordinates);
      }

      self.drawnItems.addLayer(layer);
    });
  }

  initDraw() {
    const self = this;
    this.poly = L.Draw.Polygon;
    this.poly.prototype.initialize(self.map);
    this.poly.prototype.enable();
  }

}

export default CustomFilter;
