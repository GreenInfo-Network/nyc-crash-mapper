import { connect } from 'react-redux';
import {
  filterByAreaType,
  filterByAreaIdentifier,
  filterByAreaCustom,
  toggleCustomAreaDraw,
} from '../actions/';
import FilterByArea from '../components/OptionsFilters/FilterByArea';

const mapStateToProps = ({ filterArea: { geo, identifier, drawEnabeled } }) => ({
  drawEnabeled,
  geo,
  identifier,
});

export default connect(mapStateToProps, {
  filterByAreaType,
  filterByAreaIdentifier,
  filterByAreaCustom,
  toggleCustomAreaDraw,
})(FilterByArea);
