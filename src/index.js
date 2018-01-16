import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, history  } from './_helpers';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App/>
    </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
