// @flow
import React from 'react';

type Props = {
  openModal: (modalType: string) => void
};

const AppHeader = (props: Props) => {
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
      <p className="header-about">
        <a onClick={() => openModal('about')}>About</a>
      </p>
    </div>
  );
};

export default AppHeader;
