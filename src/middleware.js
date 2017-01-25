import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import * as actions from './constants/action_types';
import { filterByTypeHarm, filterByTypePersona } from './actions/';

const middleware = [thunkMiddleware];

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  // redux-logger only works in a browser environment
  middleware.push(createLogger());
}

// For the FilterByType group, if a user selects a type that is already applied,
// disable the filters for that group by forcing the val of filter group to be 'ALL'
const filterByTypeMiddleware = ({ getState, dispatch }) => next => (action) => {
  if (action.type === actions.FILTER_BY_TYPE_HARM) {
    if (getState().filterType.harm === action.harm) {
      return dispatch(filterByTypeHarm('ALL'));
    }
    return next(action);
  } else if (action.type === actions.FILTER_BY_TYPE_PERSONA) {
    if (getState().filterType.persona === action.persona) {
      return dispatch(filterByTypePersona('ALL'));
    }
    return next(action);
  }
  return next(action);
};

middleware.push(filterByTypeMiddleware);

export default middleware;
