import { Meteor } from 'meteor/meteor';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as types from './../actions/actionTypes';
import { showModal } from './../actions/modalsCreators';
import {
  addOrderItem,
  removeOrderItem,
  removeCartItem
} from './../api';

function* addOrder(action) {
  const { order, cartItems } = action.payload;

  const { response, error } = yield call(addOrderItem, order);
  if (response) {
    yield all(cartItems.map(item => call(removeCartItem, item._id._str)));
  } else {
    if (error && error.error === "not-authorized") {
      yield put(showModal(types.MODAL_TYPE_ALERT, { text: 'Please authorize to buy product' }));
    }
  }
}

function* deleteItem(action) {
  const { id } = action.payload;

  const { response, error } = yield call(removeOrderItem, id._str);
  if (error) {
    yield put(showModal(types.MODAL_TYPE_ALERT, { text: error.reason }));
  }
}

function* cartSaga() {
  yield takeLatest(types.ORDERS_ADD_ITEM_REQUEST, addOrder);
  yield takeLatest(types.ORDERS_DELETE_ITEM_REQUEST, deleteItem);
}

export default cartSaga;