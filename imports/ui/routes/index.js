import React from 'react';
import { Route, Redirect } from 'react-router';
import Home from '../components/Home';
import Admin from '../components/Admin';

const mainRoutes = (
  <div>
    <Route exact path='/' component={Home}/>
    <Route path='/admin' component={Admin} />
  </div>
);

export default mainRoutes;
