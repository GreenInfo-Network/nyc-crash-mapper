import { connect } from 'react-redux';

import { openModal } from '../actions/';
import OptionsFilters from '../components/OptionsFilters/';

const mapStateToProps = ({ browser, crashesMaxDate: { maxDate }, filterArea }) => {
  const { height } = browser;
  const { geo } = filterArea;
  return {
    geo,
    height,
    maxDate: maxDate ? maxDate.format('MM/DD/YYYY') : ''
  };
};

export default connect(mapStateToProps, {
  openModal
})(OptionsFilters);
