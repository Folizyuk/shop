import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { stopSubscription } from 'meteor-redux-middlewares';
//import AccountsUIWrapper from './AccountsUIWrapper';

import { getProducts, PRODUCTS } from '../../actions/products-action';
import Product from './ProductItem';

class ProductList extends Component {

  componentDidMount() {
    console.log('start')
    this.props.getProducts();
  }

  componentWillUnmount() {
    this.props.stopTasksSubscription();
  }

  render() {
    return (
      <div className="container">
        <div className="product-list">
          {
            this.props.products.products.map(item => <Product product={item} key={item._id}/>)
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getProducts,
  stopTasksSubscription: stopSubscription(PRODUCTS),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
