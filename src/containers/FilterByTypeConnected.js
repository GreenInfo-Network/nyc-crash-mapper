import { connect } from 'react-redux';

import {
  filterByTypeInjury,
  filterByTypeFatality,
  filterByNoInjFat
} from '../actions/';
import FilterByType from '../components/OptionsFilters/FilterByType';

const mapStateToProps = ({ filterType }) => {
  const { injury, fatality, noInjuryFatality } = filterType;
  return {
    injury,
    fatality,
    noInjuryFatality,
  };
};

export default connect(mapStateToProps, {
  filterByTypeFatality,
  filterByTypeInjury,
  filterByNoInjFat,
})(FilterByType);
