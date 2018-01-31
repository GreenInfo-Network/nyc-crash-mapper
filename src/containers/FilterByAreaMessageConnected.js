import { connect } from 'react-redux';
import FilterByArea from '../components/OptionsFilters/FilterByAreaMessage';

const mapStateToProps = ({ filterArea: { geo } }) => ({
  geo,
});

export default connect(mapStateToProps, {
})(FilterByArea);
