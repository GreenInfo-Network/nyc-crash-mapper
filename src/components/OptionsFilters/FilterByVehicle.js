import React, { PropTypes, Component } from 'react';

import FilterButton from './FilterButton';

class FilterByVehicle extends Component {
  render() {
    const { vehicle } = this.props;
    const { filterByVehicleCar, filterByVehicleTruck, filterByVehicleMotorcycle,
      filterByVehicleBicycle, filterByVehicleSuv, filterByVehicleBusVan,
      filterByVehicleScooter, filterByVehicleOther } = this.props;

    return (
      <div className="filter-by-type">
        <ul className="filter-list">
          <li>
            <FilterButton
              label={'Car'}
              id={'car'}
              handleClick={filterByVehicleCar}
              btnSize={'med'}
              isActive={vehicle.car}
            />
          </li>
          <li>
            <FilterButton
              label={'Truck'}
              id={'truck'}
              handleClick={filterByVehicleTruck}
              btnSize={'med'}
              isActive={vehicle.truck}
            />
          </li>
          <li>
            <FilterButton
              label={'Motorcycle/Moped'}
              id={'motorcycle'}
              handleClick={filterByVehicleMotorcycle}
              btnSize={'med'}
              isActive={vehicle.motorcycle}
            />
          </li>
          <li>
            <FilterButton
              label={'Bicycle'}
              id={'bicycle'}
              handleClick={filterByVehicleBicycle}
              btnSize={'med'}
              isActive={vehicle.bicycle}
            />
          </li>
        </ul>
        <ul className="filter-list">
          <li>
            <FilterButton
              label={'SUV'}
              id={'cyclist'}
              handleClick={filterByVehicleSuv}
              btnSize={'med'}
              isActive={vehicle.suv}
            />
          </li>
          <li>
            <FilterButton
              label={'Bus-Van'}
              id={'motorist'}
              handleClick={filterByVehicleBusVan}
              btnSize={'med'}
              isActive={vehicle.busvan}
            />
          </li>
          <li>
            <FilterButton
              label={'E-Bike-Scoot'}
              id={'pedestrian'}
              handleClick={filterByVehicleScooter}
              btnSize={'med'}
              isActive={vehicle.scooter}
            />
          </li>
          <li>
            <FilterButton
              label={'Other / Unspecified'}
              id={'pedestrian'}
              handleClick={filterByVehicleOther}
              btnSize={'med'}
              isActive={vehicle.other}
            />
          </li>
        </ul>
      </div>
    );
  }
}

FilterByVehicle.propTypes = {
  filterByVehicleCar: PropTypes.func.isRequired,
  filterByVehicleTruck: PropTypes.func.isRequired,
  filterByVehicleMotorcycle: PropTypes.func.isRequired,
  filterByVehicleBicycle: PropTypes.func.isRequired,
  filterByVehicleSuv: PropTypes.func.isRequired,
  filterByVehicleBusVan: PropTypes.func.isRequired,
  filterByVehicleScooter: PropTypes.func.isRequired,
  filterByVehicleOther: PropTypes.func.isRequired,
  vehicle: PropTypes.shape({
    car: PropTypes.bool.isRequired,
    truck: PropTypes.bool.isRequired,
    motorcycle: PropTypes.bool.isRequired,
    bicycle: PropTypes.bool.isRequired,
    suv: PropTypes.bool.isRequired,
    busvan: PropTypes.bool.isRequired,
    scooter: PropTypes.bool.isRequired,
    other: PropTypes.bool.isRequired,
  }).isRequired,
};

export default FilterByVehicle;
