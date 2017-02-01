import React from 'react';

export default () => (
  <div className="modal-download-data">
    <h6>Download Data</h6>
    <p>Any active filters will be applied to your download.</p>
    <p>Choose from one of the following data formats:</p>
    <a className="button">CSV</a>
    <a className="button">GeoJSON</a>
    <a className="button">Shapefile</a>
  </div>
);
