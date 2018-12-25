import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/App.js';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor, history } from "../imports/ui/store";
import '../imports/startup/accounts-config.js';

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App history={history}/>
      </PersistGate>
    </Provider>,
    document.getElementById('myid')
  );
});
