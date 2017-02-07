import React from 'react';
import AboutCopy from './AboutCopy';

const SmallDeviceMessage = () => (
  <div className="small-device-message">
    <div className="centered">
      <h3 className="title">NYC CRASH MAPPER</h3>
      <h6 className="sub-title">by <a rel="noopener noreferrer" target="_blank" href="http://chekpeds.com">CHEKPEDS</a></h6>
      <p style={{ marginTop: 10 }}>
        Please revisit this site on a larger device. The mobile version is not yet enabled.
      </p>
      <h4>About NYC Crash Mapper</h4>
      <AboutCopy />
    </div>
  </div>
);

export default SmallDeviceMessage;
