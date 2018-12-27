import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  subscribePropertyGroups,
  unsubscribePropertyGroups,
  addPropertyGroup,
  deletePropertyGroup,
  updatePropertyGroup
} from '../../actions/propertyGroupsCreators';
import AdminPropertyGroupItem from './AdminPropertyGroupItem';

class AdminPropertyGroups extends Component {

  constructor(props) {
    super(props);
    this.state = { title: '' };
  }

  componentDidMount() {
    this.props.subscribePropertyGroups();
  }

  componentWillUnmount() {
    this.props.unsubscribePropertyGroups();
  }

  onChange = e => {
    this.setState({title: e.target.value});
  };

  onAddPropertyGroup = e => {
    if (!this.state.title.trim()) return;
    this.props.addPropertyGroup(this.state.title);
    this.setState({title: ''});
  };

  render() {
    return (
      <div>
        AdminPropertyGroups
        <div>
          <input onChange={this.onChange} value={this.state.title}/>
          <button onClick={this.onAddPropertyGroup}>Add</button>
        </div>
        <ul>
          {
            this.props.propertyGroups.map(item => (
              <AdminPropertyGroupItem
                key={item._id}
                item={item}
                deletePropertyGroup={this.props.deletePropertyGroup}
                updatePropertyGroup={this.props.updatePropertyGroup}
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
    propertyGroups: state.propertyGroups.data,
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  subscribePropertyGroups,
  unsubscribePropertyGroups,
  addPropertyGroup,
  deletePropertyGroup,
  updatePropertyGroup
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPropertyGroups);