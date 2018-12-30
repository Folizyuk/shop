import { Meteor } from 'meteor/meteor';
import { takeLatest } from 'redux-saga/effects';
import * as types from './../actions/actionTypes';

function* updateProduct(action) {
  const { product } = action.payload;
  try {
    yield Meteor.callPromise('product.update', product);
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
  yield takeLatest(types.UPDATE_PRODUCT_REQUEST, updateProduct);
  yield takeLatest(types.DELETE_PRODUCT_REQUEST, deleteProduct);
}

export default productsSaga;