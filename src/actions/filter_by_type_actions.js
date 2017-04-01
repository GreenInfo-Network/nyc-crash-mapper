// @flow

import {
  FILTER_BY_TYPE_INJURY,
  FILTER_BY_TYPE_FATALITY,
  FILTER_BY_NO_INJURY_FATALITY,
} from '../constants/action_types';

// Types for Action Creators
export type FilterByTypeInjuryAction = {
  type: typeof FILTER_BY_TYPE_INJURY,
  personType: string
};

export type FilterByTypeFatalityAction = {
  type: typeof FILTER_BY_TYPE_FATALITY,
  personType: string
};

export type FilterByNoInjFatAction = {
  type: typeof FILTER_BY_NO_INJURY_FATALITY
};

// Action Creators
export const filterByTypeInjury =
(personType: string): FilterByTypeInjuryAction => ({
  type: FILTER_BY_TYPE_INJURY,
  personType,
});

export const filterByTypeFatality =
(personType: string): FilterByTypeFatalityAction => ({
  type: FILTER_BY_TYPE_FATALITY,
  personType,
});

export const filterByNoInjFat = (): FilterByNoInjFatAction => ({
  type: FILTER_BY_NO_INJURY_FATALITY
});
