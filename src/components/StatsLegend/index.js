import React, { Component, PropTypes } from 'react';
import momentPropTypes from 'react-moment-proptypes';

import { dateStringFormatView, } from '../../constants/api';
import DateRange from './DateRange';
import TotalCrashCounter from './TotalCrashCounter';
import StatsCounter from './StatsCounter';
import ContributingFactorsList from './ContributingFactorsList';
import LegendContainer from './LegendContainer';

class StatsLegend extends Component {

  render() {
    const {
      startDate,
      endDate,
      contributingFactors,
      cyclist_injured,
      cyclist_killed,
      motorist_injured,
      motorist_killed,
      pedestrian_injured,
      pedestrian_killed,
      other_injured,
      other_killed,
      persons_injured,
      persons_killed,
      total_crashes,
    } = this.props;

    return (
      <div className="ui bottom app-stats-legend">
        <div className="container">
          <div className="row stats-header">
            <div className="seven columns">
              <DateRange
                startDate={startDate.format(dateStringFormatView)}
                endDate={endDate.format(dateStringFormatView)}
              />
              <TotalCrashCounter totalCount={total_crashes} />
            </div>
            <div className="three columns">
              <h6 className="stats-title">Contributing Factors</h6>
            </div>
            <div className="two columns">
              <h6 className="stats-title" style={{ marginLeft: '10px' }}>Legend</h6>
            </div>
          </div>
          <div className="row stats-content">
            <div className="seven columns">
              <StatsCounter
                title={'Fatalities'}
                cyclist={cyclist_killed}
                driver={motorist_killed}
                ped={pedestrian_killed}
                other={other_killed}
                total={persons_killed}
              />
              <StatsCounter
                title={'Injuries'}
                cyclist={cyclist_injured}
                driver={motorist_injured}
                ped={pedestrian_injured}
                other={other_injured}
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
  pedestrian_injured: 0,
  pedestrian_killed: 0,
  other_injured: 0,
  other_killed: 0,
  persons_injured: 0,
  persons_killed: 0,
  total_crashes: 0,
  identifier: '',
  lngLats: [],
};

StatsLegend.propTypes = {
  startDate: momentPropTypes.momentObj.isRequired,
  endDate: momentPropTypes.momentObj.isRequired,
  contributingFactors: PropTypes.arrayOf(PropTypes.shape({
    count_factor: PropTypes.number,
    factor: PropTypes.string
  })),
  cyclist_injured: PropTypes.number,
  cyclist_killed: PropTypes.number,
  motorist_injured: PropTypes.number,
  motorist_killed: PropTypes.number,
  pedestrian_injured: PropTypes.number,
  pedestrian_killed: PropTypes.number,
  other_injured: PropTypes.number,
  other_killed: PropTypes.number,
  persons_injured: PropTypes.number,
  persons_killed: PropTypes.number,
  total_crashes: PropTypes.number,
  filterType: PropTypes.shape({
    fatality: PropTypes.shape({
      cyclist: PropTypes.bool.isRequired,
      motorist: PropTypes.bool.isRequired,
      pedestrian: PropTypes.bool.isRequired,
    }).isRequired,
    injury: PropTypes.shape({
      cyclist: PropTypes.bool.isRequired,
      motorist: PropTypes.bool.isRequired,
      pedestrian: PropTypes.bool.isRequired,
    }).isRequired,
    noInjuryFatality: PropTypes.bool.isRequired
  }).isRequired,
  geo: PropTypes.string.isRequired,
  identifier: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  lngLats: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number)
  ),
};

export default StatsLegend;
