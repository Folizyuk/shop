import React, { Component } from 'react';
import { hideModal } from '../../../actions/modalsCreators';
import { registerUser } from '../../../actions/userCreators';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from "connected-react-router";
import classNames from 'classnames';
import "./style.css";

class RegisterModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,

      username: '',
      email: '',
      password: '',
    };
  }

  closeByClickOutside = (event) => {
    const modal = document.getElementsByClassName('modal')[0];
    if (event.target === modal) this.closeModal();
  };

  closeModal = () => {
    this.setState({ show: false });
    if (this.props.redirectTo) this.props.push(this.props.redirectTo);
    this.props.hideModal();
  };

  register = () => {
    const { email, username, password } = this.state;
    this.props.registerUser({email, username, password});
  };

  onChangeFormValue = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const modalClass = classNames('modal alert-modal', {'active': this.state.show});

    return (
      <div className={modalClass} onClick={this.closeByClickOutside}>
        <div className="modal-content modal-small">
          <div className="modal-header">
            <span className="title">Sign Up!</span>
            <span className="close" onClick={this.closeModal}>&#10005;</span>
          </div>
          <div className="modal-body">
            <div>
              <label htmlFor="email">email</label>
              <input id="email" type="text" name="email"
                     value={this.state.email} onChange={this.onChangeFormValue}/>
            </div>
            <div>
              <label htmlFor="username">username</label>
              <input id="username" type="text" name="username"
                     value={this.state.username} onChange={this.onChangeFormValue}/>
            </div>
            <div>
              <label htmlFor="password">password</label>
              <input id="password" type="password" name="password"
                     value={this.state.password} onChange={this.onChangeFormValue}/>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={this.register}>Register</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  hideModal,
  push,
  registerUser,
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(RegisterModal)
