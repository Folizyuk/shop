import React, { Component } from 'react';

class Product extends Component {
  render() {
    const { product } = this.props;

    return (
      <div className="product-item">
        <h3>{product.name}</h3>
        <img src={product.image}/>
        <div className="product-item--footer">
          <div className="price">${product.price}</div>
          <button className="btn-primary">buy</button>
        </div>
      </div>
    )
  }
}

export default Product;