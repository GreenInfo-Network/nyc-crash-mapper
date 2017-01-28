import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import * as actions from './constants/action_types';
import { filterByTypeHarm, filterByTypePersona } from './actions/';

const middleware = [thunkMiddleware];

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  // redux-logger only works in a browser environment
  middleware.push(createLogger());
}

export default middleware;
