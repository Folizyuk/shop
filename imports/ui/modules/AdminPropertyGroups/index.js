import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { subscribePropertyGroups, unsubscribePropertyGroups } from '../../actions/propertyGroupsCreators';

class AdminPropertyGroups extends Component {

  componentDidMount() {
    this.props.subscribePropertyGroups();
  }

  componentWillUnmount() {
    this.props.unsubscribePropertyGroups();
  }

  render() {
    return (
      <div>AdminPropertyGroups</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    propertyGroups: state.propertyGroups,
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  subscribePropertyGroups,
  unsubscribePropertyGroups
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPropertyGroups);