import React, { Component } from 'react';

import ProductList from '../../modules/ProductList';
import FilterBar from '../../modules/FilterBar';

export default Home = () => (
  <div className="container">
    <div className="content">
      <FilterBar />
      <ProductList />
    </div>
  </div>
);
