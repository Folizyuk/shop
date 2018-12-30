import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  subscribeProducts,
  unsubscribeProducts
} from '../../../actions/actionCreators';

import './style.css';

class AdminProductList extends Component {

  componentDidMount() {
    this.props.subscribeProducts();
  }

  componentWillUnmount() {
    this.props.unsubscribeProducts();
  }

  render() {
    return (
      <table className="admin_products">
        <tbody>
        <tr>
          <th>_id</th>
          <th>title</th>
          <th>image</th>
        </tr>
        {
          this.props.products.map(product => {
            return (
              <tr key={product._id}>
                <td>{product._id._str}</td>
                <td>{product.name}</td>
                <td><img src={product.image}/></td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.data,
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  subscribeProducts,
  unsubscribeProducts
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminProductList);
