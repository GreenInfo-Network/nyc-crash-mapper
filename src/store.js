import { applyMiddleware, createStore, compose } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { createResponsiveStoreEnhancer } from 'redux-responsive';

import rootReducer from './reducers/';

const middleware = [thunkMiddleware];

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  // redux-logger only works in a browser environment
  middleware.push(createLogger());
}

export default function makeStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      createResponsiveStoreEnhancer(500), // throttle time
      applyMiddleware(...middleware)
    )
  );

  if (module.hot) {
    // enable hot module replacement
    module.hot.accept('./reducers/index.js', () => {
      const nextReducer = System.import('./reducers/index.js');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
