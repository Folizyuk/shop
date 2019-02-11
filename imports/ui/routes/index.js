import React from 'react';
import { Route } from 'react-router';
import Home from '../components/Home';
import Admin from '../components/Admin';
import Cart from '../components/Cart';
import ProductDetail from '../modules/ProductDetail';

const mainRoutes = (
  <div>
    <Route exact path='/' component={Home}/>
    <Route path='/admin' component={Admin} />
    <Route path='/cart' component={Cart} />
    <Route path='/product/:id' component={ProductDetail} />
  </div>
);

export default mainRoutes;
