import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as types from './../actions/actionTypes';

function* addProduct(action) {
  try {
    const user = yield Meteor.callPromise('products.insert', action.payload);
  } catch (e) {
    console.warn('error', e);
  }
}

function* tasksSaga() {
  yield takeLatest(types.ADD_PRODUCT_REQUEST, addProduct);
}

export default tasksSaga;