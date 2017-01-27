import React, { Component, PropTypes } from 'react';

import DateRange from './DateRange';
import TotalCrashCounter from './TotalCrashCounter';
import StatsCounter from './StatsCounter';
import ContributingFactorsList from './ContributingFactorsList';
import LegendContainer from './LegendContainer';

class StatsLegend extends Component {

  componentWillMount() {
    // const { startDate, endDate, harm, persona } = this.props;
    // this.props.fetchCrashStatsData({ startDate, endDate, harm, persona });
    // this.props.fetchContributingFactors({ startDate, endDate, harm, persona });
  }

  componentWillReceiveProps(nextProps) {
    // const { startDate, endDate, harm, persona } = nextProps;
    if (this.shouldFetchNewData(nextProps)) {
      // this.props.fetchCrashStatsData({ startDate, endDate, harm, persona });
      // this.props.fetchContributingFactors({ startDate, endDate, harm, persona });
    }
  }

  shouldFetchNewData(nextProps) {
    const { startDate, endDate, harm, persona } = nextProps;
    if (
      startDate !== this.props.startDate ||
      endDate !== this.props.endDate ||
      harm !== this.props.harm ||
      persona !== this.props.persona
    ) {
      return true;
    }
    return false;
  }

  render() {
    const { startDate,
      endDate,
      contributingFactors,
      cyclist_injured,
      cyclist_killed,
      motorist_injured,
      motorist_killed,
      pedestrians_injured,
      pedestrians_killed,
      persons_injured,
      persons_killed,
      total_crashes, } = this.props;

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
              <ContributingFactorsList factors={contributingFactors} />
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
  contributingFactors: [],
  cyclist_injured: 0,
  cyclist_killed: 0,
  motorist_injured: 0,
  motorist_killed: 0,
  pedestrians_injured: 0,
  pedestrians_killed: 0,
  persons_injured: 0,
  persons_killed: 0,
  total_crashes: 0,
};

StatsLegend.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  // fetchContributingFactors: PropTypes.func.isRequired,
  // fetchCrashStatsData: PropTypes.func.isRequired,
  contributingFactors: PropTypes.arrayOf(PropTypes.shape({
    count_factor: PropTypes.number,
    factor: PropTypes.string
  })),
  cyclist_injured: PropTypes.number,
  cyclist_killed: PropTypes.number,
  motorist_injured: PropTypes.number,
  motorist_killed: PropTypes.number,
  pedestrians_injured: PropTypes.number,
  pedestrians_killed: PropTypes.number,
  persons_injured: PropTypes.number,
  persons_killed: PropTypes.number,
  total_crashes: PropTypes.number,
  harm: PropTypes.string.isRequired,
  persona: PropTypes.string.isRequired,
};

export default StatsLegend;
