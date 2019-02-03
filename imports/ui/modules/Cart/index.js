import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  subscribeCart,
  unsubscribeCart,
  addCartItem,
  updateCartItem,
  deleteCartItem
} from '../../actions/cartCreators';

import './style.css';

class Cart extends Component {
  componentDidMount() {
    this.props.subscribeCart();
  }

  componentWillUnmount() {
    this.props.unsubscribeCart();
  }

  onUpdateCartItem = (cartItem, number) => e => {
    const { product, ...item} = cartItem;
    const count = item.count + number;
    if (count < 1) return;

    this.props.updateCartItem(item, { count: count });
  };

  onDeleteCartItem = (id) => e => {
    this.props.deleteCartItem(id);
  };

  makeOrder = () => {
    console.log('order')
  };

  render() {
    return (
      <div className="cart-list">
        {
          !this.props.cartItems.length ? <div>Your cart is empty!</div> :
          this.props.cartItems.length && (
            <div>
              <table>
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Count</th>
                  <th>Sum</th>
                  <th>Change count</th>
                  <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {
                  this.props.cartItems.map(item => {
                    return (
                      <tr key={item._id}>
                        <td>
                          {item.product && item.product.name}
                        </td>
                        <td>
                          {item.product && item.product.price}
                        </td>
                        <td>
                          {item.count}
                        </td>
                        <td>
                          {item.count * item.product.price}
                        </td>
                        <td>
                          <button onClick={this.onUpdateCartItem(item, -1)}>-</button>
                          <button onClick={this.onUpdateCartItem(item, 1)}>+</button>
                        </td>
                        <td>
                          <button onClick={this.onDeleteCartItem(item._id)}>X</button>
                        </td>
                      </tr>
                    )
                  })
                }
                </tbody>
              </table>
              <div className="total-price">
                Total:
                {
                  this.props.cartItems.reduce((total, item) => {
                    return total + (item.count * item.product.price);
                  }, 0)
                }
              </div>
              <div>
                <button className="btn order" onClick={this.makeOrder}>Order</button>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cart.data,
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  subscribeCart,
  unsubscribeCart,
  addCartItem,
  updateCartItem,
  deleteCartItem
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
