import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { calculateResponsiveState } from 'redux-responsive';
import { syncHistoryWithStore } from 'react-router-redux';
import debounce from 'lodash/debounce';

import makeStore from './store';
import { makeDefaultState } from './constants/api';
import AppConnected from './containers/AppConnected';
import '../scss/main.scss';

const state = makeDefaultState();
const store = makeStore(state);
const history = syncHistoryWithStore(hashHistory, store);

// fire redux-responsive on window resize event
window.addEventListener('resize', debounce(() =>
  store.dispatch(calculateResponsiveState(window)), 250));

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppConnected}>
        <IndexRoute component={AppConnected} />
      </Route>
      <Route path="*" component={AppConnected} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
