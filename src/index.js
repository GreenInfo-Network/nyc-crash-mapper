import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import makeStore from './store';
import { defaultState } from './constants/api';
import App from './components/App';
import '../scss/main.scss';

const store = makeStore(defaultState);

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={App} />
      </Route>
      <Route path="*" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
