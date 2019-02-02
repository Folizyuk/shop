import { Meteor } from 'meteor/meteor';
import { takeLatest, call, put } from 'redux-saga/effects';
import * as types from './../actions/actionTypes';
import { showModal } from './../actions/modalsCreators';
import {
  addCartItem,
  updateCartItem,
  removeCartItem
} from './../api';

function* addProduct(action) {
  const { productId, count } = action.payload;
  const data = { productId };
  count >= 0 ? data.count = count : null;

  const { response, error } = yield call(addCartItem, data);
  if (response) {

  } else {
    if (error && error.error === "not-authorized") {
      yield put(showModal(types.MODAL_TYPE_ALERT, { text: 'Please authorize to buy product' }));
    }
  }
}

function* updateItem(action) {
  const { cart } = action.payload;

  const { response, error } = yield call(updateCartItem, cart);
  if (response) {
    //yield put(push(`/admin/products`));
  } else {
    yield put(showModal(types.MODAL_TYPE_ALERT, { text: error.reason }));
  }
}

function* deleteItem(action) {
  const { id } = action.payload;

  const { response, error } = yield call(removeCartItem, id._str);
  if (error) {
    yield put(showModal(types.MODAL_TYPE_ALERT, { text: error.reason }));
  }
}


function* cartSaga() {
  yield takeLatest(types.CART_ADD_ITEM_REQUEST, addProduct);
  yield takeLatest(types.CART_UPDATE_ITEM_REQUEST, updateItem);
  yield takeLatest(types.CART_DELETE_ITEM_REQUEST, deleteItem);
}

export default cartSaga;