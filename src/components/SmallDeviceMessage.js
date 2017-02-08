import React from 'react';
import AboutCopy from './AboutCopy';

const SmallDeviceMessage = () => (
  <div className="small-device-message">
    <div className="centered">
      <h1 className="title">NYC CRASH MAPPER</h1>
      <h2 style={{ marginTop: 10 }}>
        Mobile version under development. Please come back on your laptop!
      </h2>
      <AboutCopy />
    </div>
  </div>
);

export default SmallDeviceMessage;
