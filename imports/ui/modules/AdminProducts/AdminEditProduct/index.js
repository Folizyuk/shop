import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Helpers from './../../../helpers'

import {
  subscribeProduct,
  unsubscribeProduct,
  updateProduct,
  addProduct
} from '../../../actions/productsCreators';

import {
  subscribeProperties,
  unsubscribeProperties
} from '../../../actions/propertiesCreators';

//import './style.css';
const emptyProp = () => {
  return {prop_id: Helpers.uuidv4(), value: ''};
};

class AdminEditProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {
        price: 0,
        properties: [{...emptyProp()}]
      },
      productId: this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.productId) this.props.subscribeProduct(this.state.productId);
    this.props.subscribeProperties();
  }

  componentWillUnmount() {
    if (this.props.match.params.id) this.props.unsubscribeProduct();
    this.props.unsubscribeProperties();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.productId) this.setState({product: {...this.state.product, ...nextProps.product}});
  }

  onChange = (e) => {
    this.setState({
      product: {...this.state.product, [e.target.name]: e.target.value.trim()}
    });
  };

  onChangeProperty = (value, index) => {
    const properties = this.state.product.properties.slice();
    properties[index] = {...properties[index], [value.key]: value.value};
    this.setState({
      product: {...this.state.product, properties}
    });
  };

  onChangePrice = (e) => {
    const price = Number(e.target.value);
    if (price <= 0) return;

    this.setState({
      product: {...this.state.product, price: Number(e.target.value)}
    });
  };

  onAddEmptyProp = (e) => {
    this.setState({
      product: {...this.state.product, properties: [...this.state.product.properties, {...emptyProp()}]}
    });
  };

  onRemoveProp = (index) => {
    const properties = this.state.product.properties.slice();
    properties.splice(index, 1);
    this.setState({
      product: {...this.state.product, properties}
    });
  };

  saveProduct = () => {
    if (this.state.productId) this.props.updateProduct(this.state.product);
    else this.props.addProduct(this.state.product);
  };

  render() {
    const { properties } = this.props;
    const { product } = this.state;

    /*const filteredProps = properties.filter(item => {
      return !product.properties.some(productProp => productProp.prop_id._str === item._id._str)
    });*/

    const getPropsForSelect = (prop) => {
      const filteredProps = properties.filter(item => {
        return !product.properties.some(productProp => productProp.prop_id._str === item._id._str)
          || item._id._str === prop.prop_id._str;
      });
      return filteredProps;
    };

    return (
      <div>
        {
          this.state.productId ? 'edit product' : 'create product'
        }
        <div>
          {
            product &&
            <form>
              <div>
                <label>name</label>
                <input type="text" name="name" defaultValue={product.name} onChange={this.onChange}/>
              </div>
              {
                product.properties.map((prop, i) => {
                  return (
                    <div key={prop.prop_id}>
                      <label>property</label>
                      <select defaultValue={prop.prop_id}
                              onChange={(e) => this.onChangeProperty({
                                value: Helpers.parseMongoID(e.target.value), key: 'prop_id'}, i)
                              }>
                        <option>Select</option>
                        {
                          getPropsForSelect(prop).map(p => {
                            return <option
                              key={p._id}
                              value={p._id}>
                              {p.title}
                              </option>
                          })
                        }
                      </select>
                      <input type="text"
                             value={prop.value}
                             onChange={(e) => this.onChangeProperty({value: e.target.value, key: 'value'}, i)}
                      />
                      {
                        i === (product.properties.length - 1) &&
                        <button onClick={this.onAddEmptyProp}>+</button>
                      }
                      {
                        product.properties.length > 1 && <button onClick={() => this.onRemoveProp(i)}>-</button>
                      }
                    </div>
                  )
                })
              }
              <div>
                <label>price</label>
                <input type="number" value={product.price} onChange={this.onChangePrice}/>
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
    properties: state.properties.data
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  subscribeProduct,
  unsubscribeProduct,
  updateProduct,
  addProduct,
  subscribeProperties,
  unsubscribeProperties,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminEditProduct);
