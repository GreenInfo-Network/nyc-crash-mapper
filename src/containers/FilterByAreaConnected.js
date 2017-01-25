import { connect } from 'react-redux';

import { filterByArea } from '../actions/';
import FilterByArea from '../components/OptionsFilters/FilterByArea';

const mapStateToProps = ({ filterArea: { geo } }) => ({
  geo
});

export default connect(mapStateToProps, {
  filterByArea
})(FilterByArea);
