import React, { PropTypes } from 'react';

import MenuConnected from '../containers/MenuConnected';

const AppHeader = () => (
  <div className="app-header">
    <div className="header-logo-title">
      <div className="logo-chekpeds">
        <a href="http://chekpeds.com" target="blank" rel="noopener noreferrer">
          <img alt="chekpeds logo" src="img/checkpeds_logo@2x.jpg" />
        </a>
      </div>
      <h2 className="header-title">NYC Crash Mapper</h2>
    </div>
    <MenuConnected />
  </div>
);

AppHeader.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default AppHeader;
