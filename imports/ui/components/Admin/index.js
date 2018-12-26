import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import AdminProducts from '../../modules/AdminProducts';
import AdminPropertyGroups from '../../modules/AdminPropertyGroups';
import AdminProperties from '../../modules/AdminProperties';

import './index.css';

export default Admin = () => (
  <div className="admin">
    <div className="admin_sidebar">
      <ul>
        <li><Link to="/admin/products">create new product</Link></li>
        <li><Link to="/admin/propertyGroups">create property group</Link></li>
        <li><Link to="/admin/properties">create product property</Link></li>
      </ul>
    </div>
    <div className="admin_container">
      <Route path='/admin/products' component={AdminProducts} />
      <Route path='/admin/propertyGroups' component={AdminPropertyGroups} />
      <Route path='/admin/properties' component={AdminProperties} />
    </div>

  </div>
);
