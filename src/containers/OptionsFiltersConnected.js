import { connect } from 'react-redux';

import OptionsFilters from '../components/OptionsFilters/';

const mapStateToProps = ({ browser }) => {
  const { height } = browser;
  return {
    height
  };
};

export default connect(mapStateToProps, null)(OptionsFilters);
