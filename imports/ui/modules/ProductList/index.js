import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//import AccountsUIWrapper from './AccountsUIWrapper';

import { subscribeProducts, unsubscribeProducts } from '../../actions/actionCreators';
import Product from './ProductItem';

class ProductList extends Component {

  componentDidMount() {
    this.props.subscribeProducts();
  }

  componentWillUnmount() {
    this.props.unsubscribeProducts();
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
  subscribeProducts,
  unsubscribeProducts
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
