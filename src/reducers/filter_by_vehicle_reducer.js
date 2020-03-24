import {
  FILTER_BY_VEHICLE_CAR,
  FILTER_BY_VEHICLE_TRUCK,
  FILTER_BY_VEHICLE_MOTORCYCLE,
  FILTER_BY_VEHICLE_BICYCLE,
  FILTER_BY_VEHICLE_SUV,
  FILTER_BY_VEHICLE_BUSVAN,
  FILTER_BY_VEHICLE_SCOOTER,
  FILTER_BY_VEHICLE_OTHER,
} from '../constants/action_types';

const defaultState = {
  vehicle: {
    car: false,
    truck: false,
    motorcycle: false,
    bicycle: false,
    suv: false,
    busvan: false,
    scooter: false,
    other: false,
  },
};

export default (state = defaultState, action) => {
  const { vehicle } = state;

  switch (action.type) {
    case FILTER_BY_VEHICLE_CAR:
      return {
        ...state,
        vehicle: {
          ...vehicle,
          car: !vehicle.car,
        },
      };
    case FILTER_BY_VEHICLE_TRUCK:
      return {
        ...state,
        vehicle: {
          ...vehicle,
          truck: !vehicle.truck,
        },
      };
    case FILTER_BY_VEHICLE_MOTORCYCLE:
      return {
        ...state,
        vehicle: {
          ...vehicle,
          motorcycle: !vehicle.motorcycle,
        },
      };
    case FILTER_BY_VEHICLE_BICYCLE:
      return {
        ...state,
        vehicle: {
          ...vehicle,
          bicycle: !vehicle.bicycle,
        },
      };
    case FILTER_BY_VEHICLE_SUV:
      return {
        ...state,
        vehicle: {
          ...vehicle,
          suv: !vehicle.suv,
        },
      };
    case FILTER_BY_VEHICLE_BUSVAN:
      return {
        ...state,
        vehicle: {
          ...vehicle,
          busvan: !vehicle.busvan,
        },
      };
    case FILTER_BY_VEHICLE_SCOOTER:
      return {
        ...state,
        vehicle: {
          ...vehicle,
          scooter: !vehicle.scooter,
        },
      };
    case FILTER_BY_VEHICLE_OTHER:
      return {
        ...state,
        vehicle: {
          ...vehicle,
          other: !vehicle.other,
        },
      };
    default:
      return state;
  }
};
