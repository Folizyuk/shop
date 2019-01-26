import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push, replace } from "connected-react-router";

import * as types from '../../actions/actionTypes';
import { showModal } from '../../actions/modalsCreators';

import './index.css';

class Header extends Component {

  register = () => {
    this.props.showModal(types.MODAL_TYPE_REGISTER);
  };

  login = () => {
    this.props.showModal(types.MODAL_TYPE_LOGIN);
  };

  render() {
    return (
      <header>
        <nav>
          <NavLink to="/" exact={true} activeClassName='active'>Home</NavLink>
          <NavLink to="/admin" activeClassName='active'>Admin</NavLink>
        </nav>
        <div>
          <span onClick={this.register}>Register</span>/
          <span onClick={this.login}>Login</span>
        </div>
      </header>
    )
  }

}

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  showModal,
  replace
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);