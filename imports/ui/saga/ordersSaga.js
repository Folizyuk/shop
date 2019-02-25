import { Meteor } from 'meteor/meteor';
import { takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import * as types from './../actions/actionTypes';
import { showModal } from './../actions/modalsCreators';
import {
  addOrderItem,
  removeOrderItem
} from './../api';
import { deleteCartItem } from '../actions/cartCreators';

function* addOrder(action) {
  const { order } = action.payload;
  console.log(order)

  const { response, error } = yield call(addOrderItem, order);
  console.log('response', response)
  if (response) {
    order.products.forEach(product => {
      //yield takeEvery(deleteCartItem(product.productId));
    });
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