/*
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import appReducer from '../reducers/index'; // need to create

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

export default store;
*/


import { Tracker } from 'meteor/tracker';
import createReactiveMiddlewares from 'meteor-redux-middlewares';
import { applyMiddleware, createStore, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './../saga';
const sagaMiddleware = createSagaMiddleware();

// Of course, you can use other middlewares as well
import thunk from 'redux-thunk';

import appReducer from '../reducers/index'; // need to create

const enhancers = [];

const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
enhancers.push(devToolsExtension());

// We use an injection pattern to avoid any direct dependency on the meteor
// build tool, or version of tracker within the package.
//
// This way you should be able to use your meteor version, a community npm
// version, the future extracted official mdg package etc...
const {
  sources,
  subscriptions,
} = createReactiveMiddlewares(Tracker);

const store = createStore(appReducer, compose(
  applyMiddleware(sources, subscriptions, sagaMiddleware),
  ...enhancers,
));

sagaMiddleware.run(rootSaga);

export default store;