import { connect } from 'react-redux';

import { filterByTypePersona, filterByTypeHarm } from '../actions/';
import FilterByType from '../components/OptionsFilters/FilterByType';

const mapStateToProps = ({ filterType }) => {
  const { harm, persona } = filterType;
  return {
    harm,
    persona
  };
};

export default connect(mapStateToProps, {
  filterByTypePersona,
  filterByTypeHarm
})(FilterByType);
