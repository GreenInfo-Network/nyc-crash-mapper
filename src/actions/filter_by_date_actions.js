// @flow

// moment object type
import type Moment from 'moment';

import {
  START_DATE_CHANGE,
  END_DATE_CHANGE
} from '../constants/action_types';

type StartDateChangeAction = {
  type: typeof START_DATE_CHANGE,
  startDate: Moment,
};

type EndDateChangeAction = {
  type: typeof END_DATE_CHANGE,
  endDate: Moment
}

export const startDateChange = (startDate: Moment): StartDateChangeAction => ({
  type: START_DATE_CHANGE,
  startDate
});

export const endDateChange = (endDate: Moment): EndDateChangeAction => ({
  type: END_DATE_CHANGE,
  endDate
});
