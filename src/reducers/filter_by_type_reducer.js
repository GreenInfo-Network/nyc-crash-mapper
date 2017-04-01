// @flow

// Actions
import {
  FILTER_BY_TYPE_INJURY,
  FILTER_BY_TYPE_FATALITY,
  FILTER_BY_NO_INJURY_FATALITY,
} from '../constants/action_types';

// Flow Types
import {
  FilterByTypeInjuryAction,
  FilterByTypeFatalityAction,
  FilterByNoInjFatAction
} from '../actions';

type Action = FilterByTypeInjuryAction | FilterByTypeFatalityAction | FilterByNoInjFatAction;

type FilterByTypeState = {
  injury: {
    cyclist: boolean,
    motorist: boolean,
    pedestrian: boolean,
  },
  fatality: {
    cyclist: boolean,
    motorist: boolean,
    pedestrian: boolean,
  },
  noInjuryFatality: boolean
};

// Default Reducer State
const defaultState = {
  injury: {
    cyclist: false,
    motorist: false,
    pedestrian: false,
  },
  fatality: {
    cyclist: false,
    motorist: false,
    pedestrian: false,
  },
  noInjuryFatality: false
};

// Reducer
export default (
  state: FilterByTypeState = defaultState,
  action: Action
): FilterByTypeState => {
  const { personType } = action;
  const { injury, fatality } = state;

  switch (action.type) {
    case FILTER_BY_TYPE_INJURY:
      return {
        ...state,
        injury: {
          ...injury,
          [personType]: !injury[personType]
        },
        noInjuryFatality: false
      };
    case FILTER_BY_TYPE_FATALITY:
      return {
        ...state,
        fatality: {
          ...fatality,
          [personType]: !fatality[personType]
        },
        noInjuryFatality: false
      };
    case FILTER_BY_NO_INJURY_FATALITY:
      return {
        ...defaultState,
        noInjuryFatality: !state.noInjuryFatality
      };
    default:
      return state;
  }
};
