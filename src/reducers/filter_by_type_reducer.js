import {
  FILTER_BY_TYPE_HARM,
  FILTER_BY_TYPE_PERSONA
} from '../constants/action_types';

const defaultState = {
  persona: 'ALL',
  harm: 'ALL'
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FILTER_BY_TYPE_HARM:
      return {
        ...state,
        harm: action.harm
      };
    case FILTER_BY_TYPE_PERSONA:
      return {
        ...state,
        persona: action.persona
      };
    default:
      return state;
  }
};
