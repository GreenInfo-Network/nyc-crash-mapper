import React, { PropTypes } from 'react';

const ZoomControls = (props) => {
  const { handleZoomIn, handleZoomOut } = props;

  return (
    <div className="ui zoom-controls">
      <button className="zoom-in" onClick={() => handleZoomIn()}>+</button>
      <button className="zoom-out" onClick={() => handleZoomOut()}>–</button>
    </div>
  );
};

ZoomControls.propTypes = {
  handleZoomIn: PropTypes.func.isRequired,
  handleZoomOut: PropTypes.func.isRequired,
};

export default ZoomControls;
