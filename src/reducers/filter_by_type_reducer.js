import {
  FILTER_BY_TYPE_INJURY,
  FILTER_BY_TYPE_FATALITY,
  FILTER_BY_NO_INJURY_FATALITY,
} from '../constants/action_types';

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

export default (state = defaultState, action) => {
  let { personType } = action;
  const { injury, fatality } = state;

  if (personType) {
    personType = personType.split(' ')[0];
  }

  switch (action.type) {
    case FILTER_BY_TYPE_INJURY:
      return {
        ...state,
        injury: {
          ...injury,
          [personType]: !injury[personType]
        }
      };
    case FILTER_BY_TYPE_FATALITY:
      return {
        ...state,
        fatality: {
          ...fatality,
          [personType]: !fatality[personType]
        }
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
