// @flow

import {
  FILTER_BY_AREA_TYPE,
  FILTER_BY_AREA_IDENTIFIER,
  FILTER_BY_AREA_CUSTOM,
  TOGGLE_CUSTOM_AREA_DRAW,
} from '../constants/action_types';

// LngLat flow type
import { LngLats } from '../flow-types';


// Flow Types for Action Creators
export type FilterByAreaTypeAction = {
  type: typeof FILTER_BY_AREA_TYPE,
  geo: string
};

export type FilterByAreaIdentifierAction = {
  type: typeof FILTER_BY_AREA_IDENTIFIER,
  identifier: string
};

export type ToggleCustomAreaDrawAction = {
  type: typeof TOGGLE_CUSTOM_AREA_DRAW
};

export type FilterByAreaCustomAction = {
  type: typeof FILTER_BY_AREA_CUSTOM,
  lngLats: LngLats
};


// Action Creators
export const filterByAreaType = (geo: string = 'CITYWIDE'): FilterByAreaTypeAction => ({
  type: FILTER_BY_AREA_TYPE,
  geo,
});

export const filterByAreaIdentifier = (identifier: string): FilterByAreaIdentifierAction => ({
  type: FILTER_BY_AREA_IDENTIFIER,
  identifier
});

export const toggleCustomAreaDraw = (): ToggleCustomAreaDrawAction => ({
  type: TOGGLE_CUSTOM_AREA_DRAW,
});

export const filterByAreaCustom = (lngLats: LngLats): FilterByAreaCustomAction => ({
  type: FILTER_BY_AREA_CUSTOM,
  lngLats
});
