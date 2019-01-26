import { Meteor } from 'meteor/meteor';
import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from './../actions/actionTypes';
import { push } from "connected-react-router";

import {
  createProduct,
  updateProduct,
  deleteProduct,
} from './../api';

function* createItem(action) {
  const { product } = action.payload;
  try {
    yield call(createProduct, product);
    yield put(push(`/admin/products`));
  } catch (e) {
    console.warn('error', e);
  }
}

function* updateItem(action) {
  const { product } = action.payload;
  try {
    yield call(updateProduct, product);
    yield put(push(`/admin/products`));
  } catch (e) {
    console.warn('error', e);
  }
}

function* deleteItem(action) {
  const { id } = action.payload;
  try {
    yield call(deleteProduct, id._str);
  } catch (e) {
    console.warn('error', e);
  }
}


function* productsSaga() {
  yield takeLatest(types.ADD_PRODUCT_REQUEST, createItem);
  yield takeLatest(types.UPDATE_PRODUCT_REQUEST, updateItem);
  yield takeLatest(types.DELETE_PRODUCT_REQUEST, deleteItem);
}

export default productsSaga;