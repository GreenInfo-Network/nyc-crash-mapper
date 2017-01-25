import React, { Component, PropTypes } from 'react';

import DateRange from './DateRange';
import TotalCrashCounter from './TotalCrashCounter';
import StatsCounter from './StatsCounter';
import ContributingFactorsList from './ContributingFactorsList';
import LegendContainer from './LegendContainer';

class StatsLegend extends Component {

  componentWillMount() {
    const { startDate, endDate } = this.props;
    this.props.fetchCrashStatsData({ startDate, endDate });
  }

  componentWillReceiveProps(nextProps) {
    const { startDate, endDate } = nextProps;
    if (startDate !== this.props.startDate || endDate !== this.props.endDate) {
      this.props.fetchCrashStatsData({ startDate, endDate });
    }
  }

  render() {
    const { startDate,
      endDate,
      total_crashes,
      cyclist_injured,
      cyclist_killed,
      motorist_injured,
      motorist_killed,
      pedestrians_injured,
      pedestrians_killed,
      persons_injured,
      persons_killed } = this.props;

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
              <DateRange startDate={startDate} endDate={endDate} />
              <TotalCrashCounter totalCount={total_crashes} />
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
              <StatsCounter
                title={'Fatalities'}
                cyclist={cyclist_killed}
                driver={motorist_killed}
                ped={pedestrians_killed}
                total={persons_killed}
              />
              <StatsCounter
                title={'Injuries'}
                cyclist={cyclist_injured}
                driver={motorist_injured}
                ped={pedestrians_injured}
                total={persons_injured}
              />
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
  }
}

StatsLegend.defaultProps = {
  total_crashes: 0,
  cyclist_injured: 0,
  cyclist_killed: 0,
  motorist_injured: 0,
  motorist_killed: 0,
  pedestrians_injured: 0,
  pedestrians_killed: 0,
  persons_injured: 0,
  persons_killed: 0,
};

StatsLegend.propTypes = {
  total_crashes: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  fetchCrashStatsData: PropTypes.func.isRequired,
  cyclist_injured: PropTypes.number,
  cyclist_killed: PropTypes.number,
  motorist_injured: PropTypes.number,
  motorist_killed: PropTypes.number,
  pedestrians_injured: PropTypes.number,
  pedestrians_killed: PropTypes.number,
  persons_injured: PropTypes.number,
  persons_killed: PropTypes.number,
};

export default StatsLegend;
