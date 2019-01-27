import { Meteor } from 'meteor/meteor';
import { takeLatest, call, put } from 'redux-saga/effects';
import * as types from './../actions/actionTypes';
import { showModal } from './../actions/modalsCreators';
import {
  addProductToCart
} from './../api';

function* addProduct(action) {
  const { product } = action.payload;

  const { response, error } = yield call(addProductToCart, product);
  if (response) {

  } else {
    yield put(showModal(types.MODAL_TYPE_ALERT, { text: error.reason }));
  }
}

function* cartSaga() {
  yield takeLatest(types.CART_ADD_PRODUCT_REQUEST, addProduct);
}

export default cartSaga;