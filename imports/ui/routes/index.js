import React from 'react';
import { Route } from 'react-router';
import Home from '../components/Home';
import Admin from '../components/Admin';
import Cart from '../components/Cart';

const mainRoutes = (
  <div>
    <Route exact path='/' component={Home}/>
    <Route path='/admin' component={Admin} />
    <Route exact path='/cart' component={Cart} />
  </div>
);

export default mainRoutes;
