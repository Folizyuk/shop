import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AccountsUIWrapper from './AccountsUIWrapper';
import { bindActionCreators } from 'redux';
import { getProducts, PRODUCTS } from './actions/products-action';
import { connect } from 'react-redux';

import { stopSubscription } from 'meteor-redux-middlewares';
import './assets/style.css';

// App component - represents the whole app
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  componentDidMount() {
    this.props.getProducts();
  }

  componentWillUnmount() {
    this.props.stopTasksSubscription();
  }

  render() {
    console.log(this.props);
    return (
      <div className="container">
        <div className="product-list">
          {
            this.props.products.products.map(item => {
              return (
                <div className="product-item" key={item.id}>
                  <h3>{item.name}</h3>
                  <img src={item.image}/>
                  <div className="product-item--footer">
                    <div className="price">100$</div>
                    <button className="btn-primary">buy</button>
                  </div>
                </div>
              )
            })
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
)(App);
