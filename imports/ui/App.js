import React, { Component } from 'react';
import ProductList from './modules/ProductList';

import './assets/style.css';

// App component - represents the whole app
class App extends Component {

  render() {
    return (
      <ProductList></ProductList>
    );
  }
}

export default App;