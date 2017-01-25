import { cartoLayerSource } from './app_config';

// default app state, only export for now
export default {
  dateRange: {
    startDate: '2016-07-01',
    endDate: '2016-12-31',
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
