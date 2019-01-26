import React, { Component } from 'react';
import { hideModal } from '../../../actions/modalsCreators';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from "connected-react-router";
import classNames from 'classnames';
import "./style.css";

class AlertModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
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

  render() {
    const modalClass = classNames('modal alert-modal', {'active': this.state.show});

    return (
      <div className={modalClass} onClick={this.closeByClickOutside}>
        <div className="modal-content modal-small">
          <div className="modal-header">
            <span className="title">Warning!</span>
            <span className="close" onClick={this.closeModal}>&#10005;</span>
          </div>
          <div className="modal-body">
            {this.props.text}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={this.closeModal}>Ok</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  hideModal,
  push,
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(AlertModal)
