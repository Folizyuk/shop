import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  subscribePropertyGroups,
  unsubscribePropertyGroups,
  addPropertyGroup
} from '../../actions/propertyGroupsCreators';

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
              <li key={item._id}>
                <span>{item.title}</span>
                <button>X</button>
              </li>
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
  addPropertyGroup
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPropertyGroups);