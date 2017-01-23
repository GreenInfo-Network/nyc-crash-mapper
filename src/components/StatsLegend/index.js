import React from 'react';

import DateRange from './DateRange';
import TotalCrashCounter from './TotalCrashCounter';
import StatsCounter from './StatsCounter';
import ContributingFactorsList from './ContributingFactorsList';
import LegendContainer from './LegendContainer';

export default () => {
  const placeholderFactors = [
    { count: 2053, type: 'unspecified' },
    { count: 112, type: 'Driver Inattention / Distraction' },
    { count: 29, type: 'Fatigue / Drowsey' },
    { count: 14, type: 'Failure to Yield / Right of Way' }
  ];

  return (
    <div className="ui bottom app-stats-legend">
      <div className="container">
        <div className="row stats-header">
          <div className="seven columns">
            <DateRange startDate={'Jul 1, 2016'} endDate={'Dec 31, 2016'} />
            <TotalCrashCounter totalCount={0} />
          </div>
          <div className="three columns">
            <h6 className="stats-title">Contributing Factors</h6>
          </div>
          <div className="two columns">
            <h6 className="stats-title">Legend</h6>
          </div>
        </div>
        <div className="row stats-content">
          <div className="seven columns">
            <StatsCounter title={'Fatalities'} />
            <StatsCounter title={'Injuries'} />
          </div>
          <div className="three columns">
            <ContributingFactorsList factors={placeholderFactors} />
          </div>
          <div className="two columns">
            <LegendContainer />
          </div>
        </div>
      </div>
    </div>
  );
};
