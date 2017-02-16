import { connect } from 'react-redux';

import FilterByDate from '../components/OptionsFilters/FilterByDate';
import { startDateChange, endDateChange } from '../actions/';

const mapStateToProps = ({ filterDate: { startDate, endDate }, yearRange, crashesDateRange }) => ({
  startDate,
  endDate,
  crashesDateRange,
  years: yearRange.years || [],
});

export default connect(mapStateToProps, {
  startDateChange,
  endDateChange,
})(FilterByDate);
