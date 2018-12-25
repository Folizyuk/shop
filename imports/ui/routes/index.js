import React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../components/Home';
import Admin from '../components/Admin';

const mainRoutes = (
  <div>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/admin' component={Admin}/>
    </Switch>
  </div>
);

export default mainRoutes;
