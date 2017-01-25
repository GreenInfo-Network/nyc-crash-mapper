import { connect } from 'react-redux';

import { dateStringFormatView } from '../constants/api';
import { fetchCrashStatsData } from '../actions/';
import StatsLegend from '../components/StatsLegend/';

const mapStateToProps = ({ dateRange, crashStats: { typeStats } }) => {
  const { startDate, endDate } = dateRange;
  return {
    startDate: startDate.format(dateStringFormatView),
    endDate: endDate.format(dateStringFormatView),
    ...typeStats
  };
};

export default connect(mapStateToProps, {
  fetchCrashStatsData
})(StatsLegend);
