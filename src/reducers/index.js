import { combineReducers } from 'redux';
import { createResponsiveStateReducer } from 'redux-responsive';
import { routerReducer } from 'react-router-redux';

import dateRange from './date_range_reducer';
import filterArea from './filter_by_area_reducer';
import filterType from './filter_by_type_reducer';
import filterContributingFactor from './filter_contributing_factor_reducer';
import contributingFactors from './stats_contributing_factors_reducer';
import crashStats from './crash_stats_reducer';

// breakpoints for redux-responsive store
// taken from scss/skeleton/base/variables
const browser = createResponsiveStateReducer({
  extraSmall: 400,
  small: 550,
  medium: 750,
  large: 1000,
  extraLarge: 1200
},
  {
    extraFields: () => ({
      width: window.innerWidth,
      height: window.innerHeight
    })
  });

const rootReducer = combineReducers({
  browser,
  contributingFactors,
  crashStats,
  dateRange,
  filterArea,
  filterContributingFactor,
  filterType,
  routing: routerReducer,
});

export default rootReducer;
