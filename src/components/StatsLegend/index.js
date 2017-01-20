import React from 'react';

import DateRange from './DateRange';
import TotalCrashCounter from './TotalCrashCounter';

export default () => (
  <div className="ui bottom app-stats-legend">
    <div className="container">
      <div className="row">
        <div className="six columns">
          <DateRange startDate={'Jul 1, 2016'} endDate={'Dec 31, 2016'} />
          <TotalCrashCounter totalCount={0} />
        </div>
        <div className="four columns">
          <h6 className="roboto-bold">Contributing Factors</h6>
        </div>
        <div className="two columns">
          <h6 className="roboto-bold">Legend</h6>
        </div>
      </div>
    </div>
  </div>
);
