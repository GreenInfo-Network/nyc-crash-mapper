import React, { PropTypes } from 'react';

const AppHeader = (props) => {
  const { openModal } = props;
  return (
    <div className="app-header">
      <h2 className="header-title">NYC Crash Mapper</h2>
      <a onClick={() => openModal('about')}>
        <p className="header-about">About</p>
      </a>
    </div>
  );
};

AppHeader.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default AppHeader;
