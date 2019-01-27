import { Meteor } from 'meteor/meteor';
import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from './../actions/actionTypes';
import { showModal } from './../actions/modalsCreators';
import { push } from "connected-react-router";

import {
  createProduct,
  updateProduct,
  deleteProduct,
} from './../api';

function* createItem(action) {
  const { product } = action.payload;

  const { response, error } = yield call(createProduct, product);
  if (response) {
    yield put(push(`/admin/products`));
  } else {
    yield put(showModal(types.MODAL_TYPE_ALERT, { text: error.reason }));
  }
}

function* updateItem(action) {
  const { product } = action.payload;

  const { response, error } = call(updateProduct, product);
  if (response) {
    yield put(push(`/admin/products`));
  } else {
    yield put(showModal(types.MODAL_TYPE_ALERT, { text: error.reason }));
  }
}

function* deleteItem(action) {
  const { id } = action.payload;

  const { response, error } = yield call(deleteProduct, id._str);
  if (error) {
    yield put(showModal(types.MODAL_TYPE_ALERT, { text: error.reason }));
  }
}


function* productsSaga() {
  yield takeLatest(types.ADD_PRODUCT_REQUEST, createItem);
  yield takeLatest(types.UPDATE_PRODUCT_REQUEST, updateItem);
  yield takeLatest(types.DELETE_PRODUCT_REQUEST, deleteItem);
}

export default productsSaga;