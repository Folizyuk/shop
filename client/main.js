import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/App.js';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import appReducer from '../imports/ui/reducers'; // need to create
import '../imports/startup/accounts-config.js';

const enhancers = [];

const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
enhancers.push(devToolsExtension());

const composedEnhancers = compose(
  applyMiddleware(thunk),
  ...enhancers
);

const store = createStore(
  appReducer,
  composedEnhancers
);

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('myid')
  );
});
