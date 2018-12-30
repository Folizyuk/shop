import { Meteor } from 'meteor/meteor';
import { takeLatest } from 'redux-saga/effects';
import * as types from './../actions/actionTypes';

function* updateProduct(action) {
  console.log(action)
  const { product } = action.payload;
  try {
    yield Meteor.callPromise('product.update', product);
  } catch (e) {
    console.warn('error', e);
  }
}

function* productsSaga() {
  yield takeLatest(types.UPDATE_PRODUCT_REQUEST, updateProduct);
}

export default productsSaga;