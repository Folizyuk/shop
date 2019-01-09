import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import { subscribeProducts, unsubscribeProducts } from '../../actions/actionCreators';

class FilterBar extends Component {

  componentDidMount() {
    this.props.subscribeProducts();
  }

  componentWillUnmount() {
    this.props.unsubscribeProducts();
  }

  onChangePrice = (e) => {
    const price = Number(e.target.value);
    console.log(price);
    this.props.push({
      search: `?color=${price}`
    })
  };

  render() {
    return (
      <div className="filter-bar">
        <div>
          price <input type="number" onChange={this.onChangePrice}/>
        </div>
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
  unsubscribeProducts,
  push,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterBar);
