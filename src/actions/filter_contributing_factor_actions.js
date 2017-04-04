// @flow

import { FILTER_BY_CONTRIBUTING_FACTOR } from '../constants/action_types';

export type FilterByContributingFactor = {
  type: typeof FILTER_BY_CONTRIBUTING_FACTOR,
  factor: string
};

export default (factor: string = '') => ({
  type: FILTER_BY_CONTRIBUTING_FACTOR,
  factor
});
