import {
  FILTER_BY_TYPE_HARM,
  FILTER_BY_TYPE_PERSONA
} from '../constants/action_types';

export const filterByTypePersona = (persona = 'ALL') => ({
  type: FILTER_BY_TYPE_PERSONA,
  persona
});

export const filterByTypeHarm = (harm = 'ALL') => ({
  type: FILTER_BY_TYPE_HARM,
  harm
});
