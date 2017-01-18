import { combineReducers } from 'redux';
import { createResponsiveStateReducer } from 'redux-responsive';

// breakpoints for redux-responsive store
// taken from scss/skeleton/base/variables
const browser = createResponsiveStateReducer({
  extraSmall: 400,
  small: 550,
  medium: 750,
  large: 1000,
  extraLarge: 1200
});

const rootReducer = combineReducers({
  browser
});

export default rootReducer;
