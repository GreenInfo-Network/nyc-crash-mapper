import React from 'react';

import DateRange from './DateRange';
import TotalCrashCounter from './TotalCrashCounter';
import StatsCounter from './StatsCounter';

export default () => (
  <div className="ui bottom app-stats-legend">
    <div className="container">
      <div className="row stats-header">
        <div className="seven columns">
          <DateRange startDate={'Jul 1, 2016'} endDate={'Dec 31, 2016'} />
          <TotalCrashCounter totalCount={0} />
        </div>
        <div className="three columns">
          <h6 className="roboto-bold">Contributing Factors</h6>
        </div>
        <div className="two columns">
          <h6 className="roboto-bold">Legend</h6>
        </div>
      </div>
      <div className="row stats-content">
        <div className="seven columns">
          <StatsCounter title={'Fatalities'} />
          <StatsCounter title={'Injuries'} />
        </div>
        <div className="three columns" />
        <div className="two columns" />
      </div>
    </div>
  </div>
);
