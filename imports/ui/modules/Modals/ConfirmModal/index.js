import React, { Component } from 'react';
import { hideModal } from '../../../actions/actionCreators';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import "./style.css";

class ConfirmModal extends Component {
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
    this.props.hideModal();
  };

  confirm = () => {
    this.props.confirm();
    this.closeModal();
  };

  render() {
    const modalClass = classNames('modal confirm-modal', {'active': this.state.show});

    return (
      <div className={modalClass} onClick={this.closeByClickOutside}>
        <div className="modal-content modal-small">
          <div className="modal-header">
            <span className="title">Confirm</span>
            <span className="close" onClick={this.closeModal}>&#10005;</span>
          </div>
          <div className="modal-body">
            {this.props.text}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-cancel" onClick={this.closeModal}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={this.confirm}>Confirm</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  hideModal,
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(ConfirmModal)
