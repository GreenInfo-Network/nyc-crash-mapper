import { connect } from 'react-redux';

import { dateStringFormatView } from '../constants/api';
import { fetchCrashStatsData, fetchContributingFactors } from '../actions/';
import StatsLegend from '../components/StatsLegend/';

const mapStateToProps = (state) => {
  const { dateRange, crashStats, contributingFactors } = state;
  const { startDate, endDate } = dateRange;
  const { typeStats } = crashStats;
  const { factors } = contributingFactors;
  return {
    startDate: startDate.format(dateStringFormatView),
    endDate: endDate.format(dateStringFormatView),
    ...typeStats,
    contributingFactors: factors
  };
};

export default connect(mapStateToProps, {
  fetchCrashStatsData,
  fetchContributingFactors
})(StatsLegend);
