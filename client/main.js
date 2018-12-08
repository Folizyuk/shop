import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/App.js';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import '../imports/startup/accounts-config.js';
import store from '../imports/ui/store';

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('myid')
  );
});
