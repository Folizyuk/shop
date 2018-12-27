import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AdminPropertyGroupItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
  }

  deletePropertyGroupItem = e => {
    this.props.deletePropertyGroup(this.props.item._id);
  };

  editPropertyGroupItem = e => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  onSaveTitle = e => {
    if (!e.target.value.trim()) return;
    this.props.updatePropertyGroup(this.props.item._id, e.target.value);
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
        <button onClick={this.deletePropertyGroupItem}>X</button>
        <button onClick={this.editPropertyGroupItem}>Edit</button>
      </li>
    )
  }
}

AdminPropertyGroupItem.propTypes = {
  item: PropTypes.object,
  deletePropertyGroup: PropTypes.func,
  updatePropertyGroup: PropTypes.func,
};

export default AdminPropertyGroupItem;