import React, { PropTypes } from 'react';
import momentPropTypes from 'react-moment-proptypes';

import { configureDownloadDataSQL } from '../../constants/sql_queries';
import { cartoUser } from '../../constants/app_config';

// TO DO: fix props validation for start & end dates
const DownloadData = (props) => {
  const { startDate, endDate, closeModal, filterArea } = props;
  const sql = configureDownloadDataSQL({
    startDate,
    endDate,
    ...filterArea,
    ...props,
  });
  const sqlEncoded = window.encodeURIComponent(sql);
  const urlPartial = `https://${cartoUser}.carto.com/api/v2/sql?q=${sqlEncoded}&format=`;
  const dataTypes = ['CSV', 'GeoJSON', 'Shapefile', 'KML'];
  const renderButton = name => (
    <a
      key={name}
      className="button dl-data-btn"
      rel="noopener noreferrer"
      target="_blank"
      href={`${urlPartial}${name === 'Shapefile' ? 'shp' : name}`}
      onClick={() => closeModal()}
    >
      {name}
    </a>
  );

  return (
    <div className="modal-download-data">
      <p className="roboto-bold">Any active filters will be applied to your download.</p>
      <p>Choose from one of the following data formats:</p>
      <div className="download-data-btns">
        { dataTypes.map(d => renderButton(d)) }
      </div>
    </div>
  );
};

export default DownloadData;

DownloadData.propTypes = {
  closeModal: PropTypes.func.isRequired,
  startDate: momentPropTypes.momentObj.isRequired,
  endDate: momentPropTypes.momentObj.isRequired,
  filterArea: PropTypes.shape({}).isRequired,
};
