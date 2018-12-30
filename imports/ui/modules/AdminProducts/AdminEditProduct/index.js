import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import {
  subscribeProduct,
  unsubscribeProduct,
  updateProduct,
  deleteProduct
} from '../../../actions/productsCreators';

//import './style.css';

class AdminEditProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
  }

  componentDidMount() {
    this.props.subscribeProduct(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.unsubscribeProduct();
  }

  onChange = (e) => {
    this.setState({
      product: {...this.state.product, [e.target.name]: e.target.value.trim()}
    });
  };

  saveProduct = () => {
    const product = {...this.props.product, ...this.state.product};
    this.props.updateProduct(product);
  };

  onDelete = () => {
    this.props.deleteProduct(this.props.product._id);
    this.props.push('/admin/products');
  };

  render() {
    const { product } = this.props;
    return (
      <div>
        edit product
        <div>
          {
            product &&
            <form>
              <div>
                <button onClick={this.onDelete}>X</button>
                <label>name</label>
                <input type="text" name="name" defaultValue={product.name} onChange={this.onChange}/>
              </div>
              <div>
                <input type="button" value="Save" onClick={this.saveProduct}/>
              </div>
            </form>
          }
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
  updateProduct,
  deleteProduct,
  push
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminEditProduct);
