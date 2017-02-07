import React from 'react';
import aboutCopy from '../constants/app_copy';

export default () => (
  <div className="about-crash-mapper">
    { aboutCopy.map((p, i) => <p key={i}>{p}</p>) }
  </div>
);
