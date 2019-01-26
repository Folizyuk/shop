import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as types from '../../actions/actionTypes';
import ConfirmModal from './ConfirmModal';
import AlertModal from './AlertModal';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import "./style.css";
import { bindActionCreators } from 'redux';
import { hideModal } from '../../actions/modalsCreators';

const MODAL_COMPONENTS = {
  [types.MODAL_TYPE_CONFIRM]: ConfirmModal,
  [types.MODAL_TYPE_ALERT]: AlertModal,
  [types.MODAL_TYPE_REGISTER]: RegisterModal,
  [types.MODAL_TYPE_LOGIN]: LoginModal,
};

class RootModal extends Component {

  render() {
    if (!this.props.type) {
      return null;
    }

    const ModalComponent = MODAL_COMPONENTS[this.props.type];
    const props = {...this.props.props};
    return <ModalComponent {...props} />;
  }
}

const mapStateFromProps = ({modal}) => (
  modal
);

const mapDispatchToProps = dispatch => bindActionCreators({
  hideModal,
}, dispatch);

export default connect(
  mapStateFromProps,
  mapDispatchToProps
)(RootModal);
