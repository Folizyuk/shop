import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  subscribeProducts,
  unsubscribeProducts,
  deleteProduct
} from '../../../actions/productsCreators';

import './style.css';

class AdminProductList extends Component {

  componentDidMount() {
    this.props.subscribeProducts();
  }

  componentWillUnmount() {
    this.props.unsubscribeProducts();
  }

  onDelete = (id) => {
    this.props.deleteProduct(id);
  };

  render() {
    return (
      <table className="admin_products">
        <tbody>
        <tr>
          <th>delete</th>
          <th>edit</th>
          <th>_id</th>
          <th>title</th>
          <th>image</th>
        </tr>
        {
          this.props.products.map(product => {
            return (
              <tr key={product._id}>
                <td>
                  <button onClick={() => this.onDelete(product._id)}>X</button>
                </td>
                <td>
                  <Link to={`/admin/edit-product/${product._id._str}`}>edit</Link>
                </td>
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
  unsubscribeProducts,
  deleteProduct,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminProductList);
