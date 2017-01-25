import moment from 'moment';
import { cartoLayerSource } from './app_config';

export const dateStringFormatModel = 'YYYY-MM-DD';
export const dateStringFormatView = 'MMM D, YYYY';

// default app state, only export for now
export default {
  dateRange: {
    startDate: moment('2016-07-01', dateStringFormatModel, true),
    endDate: moment('2016-12-31', dateStringFormatModel, true),
  },
  filterArea: {
    geo: 'Citywide',
    identifier: undefined,
    latLons: [],
  },
  filterType: {
    harm: 'ALL',
    persona: 'ALL',
  },
  filterContributingFactor: 'ALL'
};

export const configureLayerSource = (sql) => {
  cartoLayerSource.sublayers[0].sql = sql;
  return cartoLayerSource;
};
