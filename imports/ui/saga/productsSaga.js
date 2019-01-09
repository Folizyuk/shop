import { Meteor } from 'meteor/meteor';
import { takeLatest, put } from 'redux-saga/effects';
import * as types from './../actions/actionTypes';
import { push } from "connected-react-router";

function* createProduct(action) {
  const { product } = action.payload;
  try {
    yield Meteor.callPromise('product.insert', product);
    yield put(push(`/admin/products`));
  } catch (e) {
    console.warn('error', e);
  }
}

function* updateProduct(action) {
  const { product } = action.payload;
  try {
    yield Meteor.callPromise('product.update', product);
    yield put(push(`/admin/products`));
  } catch (e) {
    console.warn('error', e);
  }
}

function* deleteProduct(action) {
  const { id } = action.payload;
  try {
    yield Meteor.callPromise('product.remove', id);
  } catch (e) {
    console.warn('error', e);
  }
}


function* productsSaga() {
  yield takeLatest(types.ADD_PRODUCT_REQUEST, createProduct);
  yield takeLatest(types.UPDATE_PRODUCT_REQUEST, updateProduct);
  yield takeLatest(types.DELETE_PRODUCT_REQUEST, deleteProduct);
}

export default productsSaga;