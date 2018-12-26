import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/App.js';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor, history } from "../imports/ui/store";
import '../imports/startup/accounts-config.js';

const rrr = <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App history={history}/>
    </PersistGate>
  </Provider>;

Meteor.startup(function () {
  render(
    rrr,
    document.getElementById('myid')
  );
});
