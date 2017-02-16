import {
  START_DATE_CHANGE,
  END_DATE_CHANGE
} from '../constants/action_types';

export const startDateChange = (startDate = '') => ({
  type: START_DATE_CHANGE,
  startDate
});

export const endDateChange = (endDate = '') => ({
  type: END_DATE_CHANGE,
  endDate
});
