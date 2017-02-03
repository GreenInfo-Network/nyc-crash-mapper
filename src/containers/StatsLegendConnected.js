import { connect } from 'react-redux';

// import { dateStringFormatView } from '../constants/api';
import { fetchCrashStatsData, fetchContributingFactors } from '../actions/';
import StatsLegend from '../components/StatsLegend/';

const mapStateToProps = (state) => {
  const { dateRange, crashStats, contributingFactors, filterType,
    filterArea } = state;
  const { startDate, endDate } = dateRange;
  const { typeStats } = crashStats;
  const { factors } = contributingFactors;
  const { identifier, geo, lngLats } = filterArea;
  return {
    startDate,
    endDate,
    ...typeStats,
    contributingFactors: factors,
    filterType,
    identifier,
    geo,
    lngLats
  };
};

export default connect(mapStateToProps, {
  fetchCrashStatsData,
  fetchContributingFactors
})(StatsLegend);
