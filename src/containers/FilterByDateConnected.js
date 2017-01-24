import { connect } from 'react-redux';

import FilterByDate from '../components/OptionsFilters/FilterByDate';
import { startDateChange, endDateChange } from '../actions/';

const mapStateToProps = ({ dateRange }) => ({
  startDate: dateRange.startDate,
  endDate: dateRange.endDate
});

export default connect(mapStateToProps, {
  startDateChange,
  endDateChange
})(FilterByDate);
