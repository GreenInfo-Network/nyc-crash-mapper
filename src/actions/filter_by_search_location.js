import {
  FILTER_BY_LOCATION,
  CLEAR_FILTER_BY_LOCATION,
} from '../constants/action_types';

export const filterByLocation = coordinates => ({
  type: FILTER_BY_LOCATION,
  coordinates
});

export const clearFilterByLocation = () => ({
  type: CLEAR_FILTER_BY_LOCATION,
});

export default filterByLocation;
