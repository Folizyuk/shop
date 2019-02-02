import React, { Component } from 'react';

class Product extends Component {

  addToCart = () => {
    this.props.addCartItem(this.props.product._id._str);
  };

  render() {
    const { product } = this.props;

    return (
      <div className="product-item">
        <h3>{product.name}</h3>
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