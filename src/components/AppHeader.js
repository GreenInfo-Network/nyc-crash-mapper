import React, { PropTypes } from 'react';

const AppHeader = (props) => {
  const { openModal } = props;
  return (
    <div className="app-header">
      <div className="header-logo-title">
        <div className="logo-chekpeds">
          <a href="http://chekpeds.com" target="blank" rel="noopener noreferrer">
            <img src="img/checkpeds_logo@2x.jpg" />
          </a>
        </div>
        <h2 className="header-title">NYC Crash Mapper</h2>
      </div>
      <p className="header-about">
        <a onClick={() => openModal('about')}>About</a>
      </p>
    </div>
  );
};

AppHeader.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default AppHeader;
