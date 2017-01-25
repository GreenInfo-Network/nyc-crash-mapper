import { connect } from 'react-redux';

import StatsLegend from '../components/StatsLegend/';

const mapStateToProps = ({ dateRange }) => {
  const { startDate, endDate } = dateRange;
  return {
    startDate,
    endDate,
  };
};

export default connect(mapStateToProps, {})(StatsLegend);
