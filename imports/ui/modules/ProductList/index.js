import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

//import AccountsUIWrapper from './AccountsUIWrapper';

import { subscribeProducts, unsubscribeProducts } from '../../actions/actionCreators';
import Product from './ProductItem';
import Helpers from '../../helpers/index';

import * as $ from 'jquery';

class ProductList extends Component {

  componentDidMount() {
    this.unlistenLocation = this.props.history.listen((location, action) => {
      this.props.subscribeProducts(Helpers.getObjectFromParams(location.search));
    });

    this.props.subscribeProducts(Helpers.getObjectFromParams(location.search));
  }

  componentWillUnmount() {
    this.unlistenLocation();
    this.props.unsubscribeProducts();
  }

  render() {
    return (
      <div className="product-list shadow-bar">
        {
          this.props.products.map(item => <Product product={item} key={item._id}/>)
        }
      </div>
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList));
