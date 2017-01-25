import { combineReducers } from 'redux';
import { createResponsiveStateReducer } from 'redux-responsive';
import dateRange from './date_range_reducer';
import filterByArea from './filter_by_area_reducer';
import filterByType from './filter_by_type_reducer';

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
  dateRange,
  filterByArea,
  filterByType,
});

export default rootReducer;
