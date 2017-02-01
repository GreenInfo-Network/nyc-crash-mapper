import { connect } from 'react-redux';

import { dateStringFormatModel } from '../constants/api';
import { openModal } from '../actions/';
import App from '../components/App';

const mapStateToProps = ({ dateRange }) => {
  const { startDate, endDate } = dateRange;

  return {
    startDate: startDate.format(dateStringFormatModel),
    endDate: endDate.format(dateStringFormatModel)
  };
};

export default connect(mapStateToProps, { openModal })(App);
