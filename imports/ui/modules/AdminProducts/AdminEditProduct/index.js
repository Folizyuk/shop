import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  updateProduct,
  addProduct,
  subscribeProduct,
  unsubscribeProduct
} from '../../../actions/productsCreators';

import './style.css';

class AdminEditProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {
        price: 0,
        brand: 'Apple',
        screen_size: 0,
        connectivity: '',
        processor: '',
        camera_resolution: 0,
        storage_capacity: 0,
        color: ''
      },
      productId: this.props.match.params.id,

      brands: [
        'Apple', 'Samsung'
      ],
    };
  }

  componentDidMount() {
    if (this.state.productId) this.props.subscribeProduct(this.state.productId);
  }

  componentWillUnmount() {
    if (this.props.match.params.id) this.props.unsubscribeProduct();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.productId && !this.state.product._id) {
      this.setState({product: {...this.state.product, ...nextProps.product}});
    }
  }

  onChange = (e) => {
    this.setState({
      product: {...this.state.product, [e.target.name]: e.target.value.trim()}
    });
  };

  onChangePrice = (e) => {
    const price = Number(e.target.value);
    if (price <= 0) return;

    this.setState({ product: {...this.state.product, price: price} });
  };

  onChangeScreenSize = (e) => {
    const screen_size = Number(e.target.value);
    if (screen_size <= 0) return;

    this.setState({ product: {...this.state.product, screen_size: screen_size} });
  };

  onChangeConnectivity = (e) => {
    this.setState({ product: { ...this.state.product, connectivity: e.target.value} });
  };

  onChangeProcessor = (e) => {
    this.setState({ product: { ...this.state.product, processor: e.target.value} });
  };

  onChangeCameraResolution = (e) => {
    const camera_resolution = Number(e.target.value);
    this.setState({ product: { ...this.state.product, camera_resolution: camera_resolution} });
  };

  onChangeStorageCapacity = (e) => {
    const storage_capacity = Number(e.target.value);
    this.setState({ product: { ...this.state.product, storage_capacity: storage_capacity } });
  };

  onChangeColor = (e) => {
    this.setState({ product: { ...this.state.product, color: e.target.value } });
  };

  onChangeBrand = (e) => {
    const brand = e.target.value;
    this.setState({ product: { ...this.state.product, brand: brand }});
  };

  saveProduct = () => {
    if (this.state.productId) this.props.updateProduct(this.state.product);
    else this.props.addProduct(this.state.product);
  };

  handleSelectedFile = event => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      const product = Object.assign({}, this.state.product, { image: e.target.result });
      this.setState({ product });
    };
    fileReader.readAsDataURL(file);
  };

  render() {
    const { product } = this.state;

    return (
      <div className="admin-product">
        {
          <h3> { this.state.productId ? 'edit product' : 'create product' } </h3>
        }
        <div>
          {
            product &&
            <form>
              <div className="form-row">
                <label>name</label>
                <input type="text" name="name" defaultValue={product.name} onChange={this.onChange}/>
              </div>
              <div className="form-row">
                <label>price</label>
                <input type="number" value={product.price} onChange={this.onChangePrice}/>
              </div>
              <div className="form-row">
                <label>Brand</label>
                <select value={product.brand}
                        onChange={this.onChangeBrand}>
                  <option>Select</option>
                  {
                    this.state.brands.map(brand => {
                      return <option
                        key={brand}
                        value={brand}>
                        { brand }
                      </option>
                    })
                  }
                </select>
              </div>
              <div className="form-row">
                <label>Screen Size</label>
                <input type="number" value={product.screen_size} onChange={this.onChangeScreenSize}/>
              </div>
              <div className="form-row">
                <label>Connectivity (Bluetooth, NFC, Wi-Fi, etc...)</label>
                <input type="text" value={product.connectivity} onChange={this.onChangeConnectivity}/>
              </div>
              <div className="form-row">
                <label>Processor</label>
                <input type="text" value={product.processor} onChange={this.onChangeProcessor}/>
              </div>
              <div className="form-row">
                <label>Camera Resolution (MP)</label>
                <input type="number" value={product.camera_resolution} onChange={this.onChangeCameraResolution}/>
              </div>
              <div className="form-row">
                <label>Storage Capacity (GB)</label>
                <input type="number" value={product.storage_capacity} onChange={this.onChangeStorageCapacity}/>
              </div>
              <div className="form-row">
                <label>Color</label>
                <input type="text" value={product.color} onChange={this.onChangeColor}/>
              </div>
              <div className="form-row">
                <label>Image</label>
                <input type="file" name="" id="" onChange={this.handleSelectedFile} />
              </div>
              <div className="form-row">
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
  updateProduct,
  addProduct,
  subscribeProduct,
  unsubscribeProduct
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminEditProduct);
