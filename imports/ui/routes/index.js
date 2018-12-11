import React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../components/Home/';
import About from '../components/About/';

const mainRoutes = (
  <div>
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/admin' component={About}/>
      </Switch>
    </main>
    <Footer/>
  </div>
);

export default mainRoutes;
