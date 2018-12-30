import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  subscribeProperties,
  unsubscribeProperties,
  addProperty,
  deleteProperty,
  updateProperty
} from '../../actions/propertiesCreators';
import AdminPropertyItem from './AdminPropertyItem';

class AdminProperties extends Component {

  constructor(props) {
    super(props);
    this.state = { title: '' };
  }

  componentDidMount() {
    this.props.subscribeProperties();
  }

  componentWillUnmount() {
    this.props.unsubscribeProperties();
  }

  onChange = e => {
    this.setState({title: e.target.value});
  };

  onAddProperty = e => {
    if (!this.state.title.trim()) return;
    this.props.addProperty(this.state.title);
    this.setState({title: ''});
  };

  render() {
    return (
      <div>
        AdminProperties
        <div>
          <input onChange={this.onChange} value={this.state.title}/>
          <button onClick={this.onAddProperty}>Add</button>
        </div>
        <ul>
          {
            this.props.properties.map(item => (
              <AdminPropertyItem
                key={item._id}
                item={item}
                deleteProperty={this.props.deleteProperty}
                updateProperty={this.props.updateProperty}
              />
            ))
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    properties: state.properties.data
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  subscribeProperties,
  unsubscribeProperties,
  addProperty,
  deleteProperty,
  updateProperty
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminProperties);