import React, { PropTypes } from 'react';

import Menu from './Menu';

const AppHeader = (props) => {
  const { openModal } = props;
  return (
    <div className="app-header">
      <div className="header-logo-title">
        <div className="logo-chekpeds">
          <a href="http://chekpeds.com" target="blank" rel="noopener noreferrer">
            <img alt="chekpeds logo" src="img/checkpeds_logo@2x.jpg" />
          </a>
        </div>
        <h2 className="header-title">NYC Crash Mapper</h2>
      </div>
      <Menu openModal={openModal} />
    </div>
  );
};

AppHeader.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default AppHeader;
