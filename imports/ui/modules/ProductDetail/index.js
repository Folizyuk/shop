import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { subscribeProduct, unsubscribeProduct } from '../../actions/productsCreators';
import { addCartItem } from '../../actions/cartCreators';
import './style.css';

class ProductDetail extends Component {

  componentDidMount() {
    this.unlistenLocation = this.props.history.listen((location, action) => {
      this.props.subscribeProduct(this.props.match.params.id);
    });

    this.props.subscribeProduct(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.unlistenLocation();
    this.props.unsubscribeProduct();
  }

  addToCart = () => {
    this.props.addCartItem(this.props.product._id._str);
  };

  render() {
    const { product } = this.props;

    return (
      <div className="product_detail">
        <img src={product.image}/>
        <table>
          <tr>
            <td>Name</td>
            <td>{product.name}</td>
          </tr>
          <tr>
            <td>Brand</td>
            <td>{product.brand}</td>
          </tr>
          <tr>
            <td>Color</td>
            <td>{product.color}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>${product.price}</td>
          </tr>
          <tr>
            <td>Screen Size</td>
            <td>{product.screen_size}</td>
          </tr>
          <tr>
            <td>Connectivity</td>
            <td>{product.connectivity}</td>
          </tr>
          <tr>
            <td>Processor</td>
            <td>{product.processor}</td>
          </tr>
          <tr>
            <td>Camera resolution</td>
            <td>{product.camera_resolution}</td>
          </tr>
          <tr>
            <td>Storage capacity</td>
            <td>{product.storage_capacity}</td>
          </tr>
        </table>
        <div className="product_detail--footer">
          <button className="btn-primary" onClick={this.addToCart}>buy</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.product.data,
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  subscribeProduct,
  unsubscribeProduct,
  addCartItem
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail));
