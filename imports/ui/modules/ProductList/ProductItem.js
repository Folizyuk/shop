import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Product extends Component {

  addToCart = () => {
    this.props.addCartItem(this.props.product._id._str);
  };

  render() {
    const { product } = this.props;

    return (
      <div className="product-item">
        <h3>
          <Link to={`/product/${product._id._str}`}>{product.name}</Link>
        </h3>
        <img src={product.image}/>
        <div className="product-item--footer">
          <div className="price">${product.price}</div>
          <button className="btn-primary" onClick={this.addToCart}>buy</button>
        </div>
      </div>
    )
  }
}

export default Product;