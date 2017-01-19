import { connect } from 'react-redux';

import OptionsFilters from '../components/OptionsFilters/';

const mapStateToProps = ({ browser }) => {
  const { innerHeight } = browser;
  return {
    innerHeight
  };
};

export default connect(mapStateToProps, null)(OptionsFilters);
