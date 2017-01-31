import { connect } from 'react-redux';
import {
  filterByAreaType,
  filterByAreaIdentifier,
  filterByAreaCustom,
} from '../actions/';
import FilterByArea from '../components/OptionsFilters/FilterByArea';

const mapStateToProps = ({ filterArea: { geo } }) => ({
  geo
});

export default connect(mapStateToProps, {
  filterByAreaType,
  filterByAreaIdentifier,
  filterByAreaCustom,
})(FilterByArea);
