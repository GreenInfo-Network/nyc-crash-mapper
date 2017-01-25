import { applyMiddleware, createStore, compose } from 'redux';
import { createResponsiveStoreEnhancer } from 'redux-responsive';

import rootReducer from './reducers/';
import middleware from './middleware';

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
