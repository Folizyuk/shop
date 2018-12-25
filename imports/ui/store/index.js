/*
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

export default store;*/


/*REDUCER*/
import persistReducer from '../reducers';
/*ROUTER*/
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
/*SAGA*/
import createSagaMiddleware from 'redux-saga';
import mainSaga from '../saga';
/*PERSIST*/
import { persistStore } from 'redux-persist';

/** history **/
export const history = createBrowserHistory();
/** create the saga middleware **/
const sagaMiddleware = createSagaMiddleware();
const enhancers = [];
const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
enhancers.push(devToolsExtension());

const middleware = [
  sagaMiddleware,
  routerMiddleware(history) // for dispatching history actions
];

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

export const store = createStore(
  connectRouter(history)(persistReducer),
  composedEnhancers
);

export const persistor = persistStore(store);

/** then run the saga **/
sagaMiddleware.run(mainSaga);

window.store = store;
