import { connect } from 'react-redux';

import FilterByDate from '../components/OptionsFilters/FilterByDate';
import { startDateChange, endDateChange } from '../actions/';

const mapStateToProps = ({ filterDate: { startDate, endDate }, yearRange }) => ({
  startDate,
  endDate,
  years: yearRange.years || [],
});

export default connect(mapStateToProps, {
  startDateChange,
  endDateChange,
})(FilterByDate);
