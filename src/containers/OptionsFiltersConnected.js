import { connect } from 'react-redux';

import { openModal } from '../actions/';
import OptionsFilters from '../components/OptionsFilters/';

const mapStateToProps = ({ browser, crashesMaxDate: { maxDate } }) => {
  const { height } = browser;
  return {
    height,
    maxDate: maxDate ? maxDate.format('MM/DD/YYYY') : ''
  };
};

export default connect(mapStateToProps, {
  openModal
})(OptionsFilters);
