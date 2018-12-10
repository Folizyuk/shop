import { Tracker } from 'meteor/tracker';
import createReactiveMiddlewares from 'meteor-redux-middlewares';
import { applyMiddleware, createStore, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './../saga';
const sagaMiddleware = createSagaMiddleware();

import appReducer from '../reducers/index'; // need to create

const enhancers = [];

const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
enhancers.push(devToolsExtension());

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