import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AdminPropertyItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
  }

  deletePropertyItem = e => {
    this.props.deleteProperty(this.props.item._id);
  };

  editPropertyItem = e => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  onSaveTitle = e => {
    if (!e.target.value.trim()) return;
    this.props.updateProperty(this.props.item._id, e.target.value);
    this.setState({ isEditing: false });
  };

  render() {
    const { item } = this.props;

    return (
      <li>
        <span>
          {
            !this.state.isEditing ? item.title
              : <input defaultValue={item.title} onBlur={this.onSaveTitle}/>
          }
        </span>
        <button onClick={this.deletePropertyItem}>X</button>
        <button onClick={this.editPropertyItem}>Edit</button>
      </li>
    )
  }
}

AdminPropertyItem.propTypes = {
  item: PropTypes.object,
  deleteProperty: PropTypes.func,
  updateProperty: PropTypes.func,
};

export default AdminPropertyItem;