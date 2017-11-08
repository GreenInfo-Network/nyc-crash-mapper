import {
  FILTER_BY_AREA_TYPE,
  FILTER_BY_AREA_IDENTIFIER,
  FILTER_BY_AREA_CUSTOM,
  TOGGLE_CUSTOM_AREA_DRAW,
} from '../constants/action_types';

export const filterByAreaType = (geo = 'citywide') => ({
  type: FILTER_BY_AREA_TYPE,
  geo,
});

export const filterByAreaIdentifier = identifier => ({
  type: FILTER_BY_AREA_IDENTIFIER,
  identifier
});

export const toggleCustomAreaDraw = () => ({
  type: TOGGLE_CUSTOM_AREA_DRAW,
});

export const filterByAreaCustom = lngLats => ({
  type: FILTER_BY_AREA_CUSTOM,
  lngLats
});
