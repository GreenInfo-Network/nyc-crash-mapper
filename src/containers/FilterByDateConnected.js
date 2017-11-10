import { connect } from 'react-redux';

import FilterByDate from '../components/OptionsFilters/FilterByDate';
import { startDateChange, endDateChange } from '../actions/';

const mapStateToProps = ({
  filterDate: { startDate, endDate },
  yearRange,
  crashesDateRange,
  crashesMaxDate,
}) => ({
  startDate,
  endDate,
  maxDate: crashesMaxDate.maxDate,
  crashesDateRange,
  years: yearRange.years || [],
});

export default connect(mapStateToProps, {
  startDateChange,
  endDateChange,
})(FilterByDate);
