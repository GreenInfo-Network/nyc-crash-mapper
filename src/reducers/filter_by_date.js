// @flow

import moment from 'moment';

import {
  START_DATE_CHANGE,
  END_DATE_CHANGE
} from '../constants/action_types';

// Flow action types
import {
  StartDateChangeAction,
  EndDateChangeAction
} from '../actions';

type Action = StartDateChangeAction | EndDateChangeAction;

type FilterByDateState = {
  startDate: moment,
  endDate: moment,
};

const defaultState = {
  startDate: moment(),
  endDate: moment()
};

export default (
state: FilterByDateState = defaultState,
action: Action
): FilterByDateState => {
  switch (action.type) {
    case START_DATE_CHANGE:
      return {
        ...state,
        startDate: action.startDate
      };
    case END_DATE_CHANGE:
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};
