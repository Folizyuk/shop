import React, { Component } from 'react';
import AdminProductList from './AdminProductList';

class AdminProducts extends Component {
  render() {
    return (
      <div>
        AdminProducts
        <div>
          <AdminProductList />
        </div>
      </div>
    )
  }
}

export default AdminProducts;