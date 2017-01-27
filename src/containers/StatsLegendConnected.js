import { connect } from 'react-redux';

import { dateStringFormatView } from '../constants/api';
import { fetchCrashStatsData, fetchContributingFactors } from '../actions/';
import StatsLegend from '../components/StatsLegend/';

const mapStateToProps = (state) => {
  const { dateRange, crashStats, contributingFactors, filterType } = state;
  const { startDate, endDate } = dateRange;
  const { typeStats } = crashStats;
  const { factors } = contributingFactors;
  const { harm, persona } = filterType;
  return {
    startDate: startDate.format(dateStringFormatView),
    endDate: endDate.format(dateStringFormatView),
    ...typeStats,
    contributingFactors: factors,
    harm,
    persona
  };
};

export default connect(mapStateToProps, {
  fetchCrashStatsData,
  fetchContributingFactors
})(StatsLegend);
