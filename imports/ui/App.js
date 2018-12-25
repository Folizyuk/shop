import React, { Component } from 'react';

import { ConnectedRouter } from 'connected-react-router';
import routes from './routes';

import './assets/style.css';

const App = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <div className="App">
        { routes }
      </div>
    </ConnectedRouter>
  )
};

export default App;