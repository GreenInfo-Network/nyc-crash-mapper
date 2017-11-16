import { connect } from 'react-redux';

import { dateStringFormatModel } from '../constants/api';
import { openModal } from '../actions';
import Menu from '../components/Menu';

const mapStateToProps = ({ filterDate, filterArea, filterType }) => {
  const { startDate, endDate } = filterDate;
  const { geo, identifier } = filterArea;
  const { injury, fatality } = filterType;

  // these props are used to create the query params when linking to the chart view app
  return {
    p1start: startDate.format(dateStringFormatModel),
    p1end: endDate.format(dateStringFormatModel),
    geo,
    primary: identifier,
    pinj: injury.pedestrian,
    pfat: fatality.pedestrian,
    cinj: injury.cyclist,
    cfat: fatality.cyclist,
    minj: injury.motorist,
    mfat: fatality.motorist,
  };
};

export default connect(mapStateToProps, {
  openModal,
})(Menu);
