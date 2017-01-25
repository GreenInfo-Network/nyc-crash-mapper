import { FILTER_BY_CONTRIBUTING_FACTOR } from '../constants/action_types';

export default (factor = '') => ({
  type: FILTER_BY_CONTRIBUTING_FACTOR,
  factor
});
