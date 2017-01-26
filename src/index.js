import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { calculateResponsiveState } from 'redux-responsive';
import { syncHistoryWithStore } from 'react-router-redux';
import { debounce } from 'lodash';

import makeStore from './store';
import defaultState from './constants/api';
import App from './components/App';
import '../scss/main.scss';

const store = makeStore(defaultState);
const history = syncHistoryWithStore(hashHistory, store);

// fire redux-responsive on window resize event
window.addEventListener('resize', debounce(() =>
  store.dispatch(calculateResponsiveState(window)), 250));

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={App} />
      </Route>
      <Route path="*" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
