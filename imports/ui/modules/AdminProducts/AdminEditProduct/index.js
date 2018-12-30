import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  subscribeProduct,
  unsubscribeProduct,
  updateProduct,
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
    const id = this.props.match.params.id;
    if (id) this.props.subscribeProduct(id);
  }

  componentWillUnmount() {
    if (this.props.match.params.id) this.props.unsubscribeProduct();
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
        {
          this.props.match.params.id ? 'edit product' : 'create product'
        }
        <div>
          {
            product &&
            <form>
              <div>
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
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminEditProduct);
