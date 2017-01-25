import { connect } from 'react-redux';

import { dateStringFormatView } from '../constants/api';
import StatsLegend from '../components/StatsLegend/';

const mapStateToProps = ({ dateRange }) => {
  const { startDate, endDate } = dateRange;
  return {
    startDate: startDate.format(dateStringFormatView),
    endDate: endDate.format(dateStringFormatView),
  };
};

export default connect(mapStateToProps, {})(StatsLegend);
