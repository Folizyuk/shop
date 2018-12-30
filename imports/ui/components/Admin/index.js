import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import AdminProducts from '../../modules/AdminProducts';
import AdminPropertyGroups from '../../modules/AdminPropertyGroups';
import AdminProperties from '../../modules/AdminProperties';
import AdminEditProduct from '../../modules/AdminProducts/AdminEditProduct';

import './index.css';

export default Admin = () => (
  <div className="admin">
    <div className="admin_sidebar">
      <ul>
        <li><Link to="/admin/products">products</Link></li>
        <li><Link to="/admin/propertyGroups">property groups</Link></li>
        <li><Link to="/admin/properties">product properties</Link></li>
      </ul>
    </div>
    <div className="admin_container">
      <Route path='/admin/products' component={AdminProducts} />
      <Route path='/admin/propertyGroups' component={AdminPropertyGroups} />
      <Route path='/admin/properties' component={AdminProperties} />
      <Route path='/admin/edit-product/:id' component={AdminEditProduct} />
      <Route path='/admin/create-product' component={AdminEditProduct} />
    </div>

  </div>
);
