import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';

import Header from './components/Header';
import routes from './routes';
import RootModal from './modules/Modals/RootModal';

import './assets/style.css';

const App = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <div className="App">
        <Header/>
        { routes }
        <RootModal />
      </div>
    </ConnectedRouter>
  )
};

export default App;