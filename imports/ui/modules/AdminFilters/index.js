import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminFilterList from './AdminFilterList';

class AdminFilters extends Component {
  render() {
    return (
      <div>
        Admin Filters
        <Link to="/admin/create-filter"> create new filter</Link>
        <div>
          <AdminFilterList />
        </div>
      </div>
    )
  }
}

export default AdminFilters;