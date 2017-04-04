// @flow

import { FILTER_BY_CONTRIBUTING_FACTOR } from '../constants/action_types';

// Flow Types
import { FilterByContributingFactor } from '../actions';

export default (
  state: string = 'ALL',
  action: FilterByContributingFactor
): FilterByContributingFactor => {
  switch (action.type) {
    case FILTER_BY_CONTRIBUTING_FACTOR:
      return action.factor;
    default:
      return state;
  }
};
