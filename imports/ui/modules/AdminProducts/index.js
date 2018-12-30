import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminProductList from './AdminProductList';

class AdminProducts extends Component {
  render() {
    return (
      <div>
        AdminProducts
        <Link to="/admin/products">create new product</Link>
        <div>
          <AdminProductList />
        </div>
      </div>
    )
  }
}

export default AdminProducts;