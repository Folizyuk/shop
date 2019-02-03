import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  subscribeOrders,
  unsubscribeOrders
} from '../../actions/ordersCreators';

import './style.css';

class AdminOrders extends Component {
  componentDidMount() {
    this.props.subscribeOrders();
  }

  componentWillUnmount() {
    this.props.unsubscribeOrders();
  }

  makeOrder = () => {

  };

  render() {
    return (
      <div className="cart-list">
        {
          !this.props.orders.length ? <div>Your cart is empty!</div> :
            this.props.orders.length && (
              <div>
                <table>
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Count</th>
                    <th>Sum</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.props.orders.map((order, index) => {
                      order.products.map(product => {
                        console.log(product)
                        return (
                          <tr key={order._id}>
                            <td>
                              {product.name}
                            </td>
                            <td>
                              {product.price}
                            </td>
                            <td>
                              {product.count}
                            </td>
                            <td>
                              {product.count * product.price}
                            </td>
                          </tr>
                        )
                      })
                    })
                  }
                  </tbody>
                </table>
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
    orders: state.orders.data,
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  subscribeOrders,
  unsubscribeOrders
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminOrders);
