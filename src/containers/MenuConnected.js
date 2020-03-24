import { connect } from 'react-redux';

import { dateStringFormatModel } from '../constants/api';
import { openModal } from '../actions';
import Menu from '../components/Menu';

const mapStateToProps = ({ filterDate, filterArea, filterType, filterVehicle }) => {
  const { startDate, endDate } = filterDate;
  const { geo, identifier, lngLats } = filterArea;
  const { injury, fatality } = filterType;

  // these props are used to create the query params when linking to the chart view app
  return {
    p1start: startDate.format(dateStringFormatModel),
    p1end: endDate.format(dateStringFormatModel),
    geo,
    lngLats: encodeURIComponent(JSON.stringify(lngLats)),
    primary: identifier,
    pinj: injury.pedestrian,
    pfat: fatality.pedestrian,
    cinj: injury.cyclist,
    cfat: fatality.cyclist,
    minj: injury.motorist,
    mfat: fatality.motorist,
    vcar: filterVehicle.vehicle.car,
    vtruck: filterVehicle.vehicle.truck,
    vmotorcycle: filterVehicle.vehicle.motorcycle,
    vbicycle: filterVehicle.vehicle.bicycle,
    vsuv: filterVehicle.vehicle.suv,
    vbusvan: filterVehicle.vehicle.busvan,
    vscooter: filterVehicle.vehicle.scooter,
    vother: filterVehicle.vehicle.other,
  };
};

export default connect(mapStateToProps, {
  openModal,
})(Menu);
