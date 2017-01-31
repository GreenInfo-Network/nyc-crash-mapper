import {
  FILTER_BY_AREA_TYPE,
  FILTER_BY_AREA_IDENTIFIER,
  FILTER_BY_AREA_CUSTOM,
} from '../constants/action_types';

export const filterByAreaType = (geo = 'CITYWIDE') => ({
  type: FILTER_BY_AREA_TYPE,
  geo,
});

export const filterByAreaIdentifier = identifier => ({
  type: FILTER_BY_AREA_IDENTIFIER,
  identifier
});

export const filterByAreaCustom = latLons => ({
  type: FILTER_BY_AREA_CUSTOM,
  latLons
});
