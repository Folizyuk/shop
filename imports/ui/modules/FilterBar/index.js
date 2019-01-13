import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push, replace } from "connected-react-router";

import { subscribeProducts, unsubscribeProducts } from '../../actions/actionCreators';
import Helpers from '../../helpers';
import './style.css';

class FilterBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      minPrice: '',
      maxPrice: ''
    };
  }

  componentDidMount() {
    this.debounce = Helpers.debounce();
    this.props.subscribeProducts();
    this.initBarAccordingToParams();
  }

  componentWillUnmount() {
    this.props.unsubscribeProducts();
  }

  initBarAccordingToParams() {
    const params = Helpers.getObjectFromParams(location.search);
    Object.keys(params).forEach(key => {
      if (this.state.hasOwnProperty(key)) this.setState({ [key]: params[key] })
    });
  }

  onChangePrice = (e) => {
    const paramName = e.target.name;
    const price = Number(e.target.value);
    this.setState({ [paramName]: price });
    const currentParams = Helpers.getObjectFromParams(location.search);
    currentParams[paramName] = price;
    const queryStr = Helpers.getQueryStringFromObj(currentParams);

    this.debounce(() => {
      this.props.replace({ search: `?${queryStr}` });
    }, 300);
  };

  render() {
    return (
      <div className="filter-bar shadow-bar">
        <div className="row">
          <div className="filter-bar--title">price</div>
          from <input type="number"
                      name="minPrice"
                      value={this.state.minPrice}
                      onChange={this.onChangePrice}/>
          to <input type="number"
                    name="maxPrice"
                    value={this.state.maxPrice}
                    onChange={this.onChangePrice}/>
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
  replace
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterBar);
