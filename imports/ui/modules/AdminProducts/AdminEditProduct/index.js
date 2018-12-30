import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  subscribeProduct,
  unsubscribeProduct,
  updateProduct
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

  render() {
    const { product } = this.props;
    return (
      <div>
        edit product
        <div>
          {
            product &&
            <form>
              <label>name</label>
              <input type="text" name="name" defaultValue={product.name} onChange={this.onChange}/>
              <input type="button" value="Save" onClick={this.saveProduct}/>
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
  updateProduct
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminEditProduct);
