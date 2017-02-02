import React, { PropTypes } from 'react';

import { configureDownloadDataSQL } from '../../constants/sql_queries';
import { cartoUser } from '../../constants/app_config';

const DownloadData = (props) => {
  const { startDate, endDate } = props;
  const sql = configureDownloadDataSQL({
    startDate,
    endDate,
    ...props,
  });
  const sqlEncoded = window.encodeURIComponent(sql);
  const urlPartial = `https://${cartoUser}.carto.com/api/v2/sql?q=${sqlEncoded}&format=`;

  return (
    <div className="modal-download-data">
      <p className="roboto-bold">Any active filters will be applied to your download.</p>
      <p>Choose from one of the following data formats:</p>
      <div className="download-data-btns">
        <a className="button dl-data-btn" rel="noopener noreferrer" target="_blank" href={`${urlPartial}csv`}>
          CSV
        </a>
        <a className="button dl-data-btn" rel="noopener noreferrer" target="_blank" href={`${urlPartial}geojson`}>
          GeoJSON
        </a>
        <a className="button dl-data-btn" rel="noopener noreferrer" target="_blank" href={`${urlPartial}shp`}>
          Shapefile
        </a>
        <a className="button dl-data-btn" rel="noopener noreferrer" target="_blank" href={`${urlPartial}kml`}>
          KML
        </a>
      </div>
    </div>
  );
};

export default DownloadData;

DownloadData.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired
};
