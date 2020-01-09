import { connect } from 'react-redux';

import {
  filterByVehicleCar,
  filterByVehicleTruck,
  filterByVehicleMotorcycle,
  filterByVehicleBicycle,
  filterByVehicleSuv,
  filterByVehicleBusVan,
  filterByVehicleScooter,
  filterByVehicleOther
} from '../actions/';
import FilterByVehicle from '../components/OptionsFilters/FilterByVehicle';

const mapStateToProps = ({ filterVehicle }) => {
  const { vehicle } = filterVehicle;
  return {
    vehicle,
  };
};

export default connect(mapStateToProps, {
  filterByVehicleCar,
  filterByVehicleTruck,
  filterByVehicleMotorcycle,
  filterByVehicleBicycle,
  filterByVehicleSuv,
  filterByVehicleBusVan,
  filterByVehicleScooter,
  filterByVehicleOther,
})(FilterByVehicle);
