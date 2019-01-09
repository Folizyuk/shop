import { Meteor } from 'meteor/meteor';
import { takeLatest } from 'redux-saga/effects';
import * as types from './../actions/actionTypes';

function* createFilter(action) {
  const { filter } = action.payload;
  try {
    yield Meteor.callPromise('filter.insert', filter);
  } catch (e) {
    console.warn('error', e);
  }
}

function* updateFilter(action) {
  const { filter } = action.payload;
  try {
    yield Meteor.callPromise('filter.update', filter);
  } catch (e) {
    console.warn('error', e);
  }
}

function* deleteFilter(action) {
  const { id } = action.payload;
  try {
    yield Meteor.callPromise('filter.remove', id);
  } catch (e) {
    console.warn('error', e);
  }
}


function* filtersSaga() {
  yield takeLatest(types.ADD_FILTER_REQUEST, createFilter);
  yield takeLatest(types.UPDATE_FILTER_REQUEST, updateFilter);
  yield takeLatest(types.DELETE_FILTER_REQUEST, deleteFilter);
}

export default filtersSaga;