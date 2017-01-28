import {
  FILTER_BY_TYPE_INJURY,
  FILTER_BY_TYPE_FATALITY,
  FILTER_BY_NO_INJURY_FATALITY,
} from '../constants/action_types';

export const filterByTypeInjury = personType => ({
  type: FILTER_BY_TYPE_INJURY,
  personType,
});

export const filterByTypeFatality = personType => ({
  type: FILTER_BY_TYPE_FATALITY,
  personType,
});

export const filterByNoInjFat = () => ({
  type: FILTER_BY_NO_INJURY_FATALITY
});
