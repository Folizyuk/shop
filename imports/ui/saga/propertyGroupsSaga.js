import { takeLatest } from 'redux-saga/effects';
import * as types from './../actions/actionTypes';

function* createPropertyGroup(action) {
  const { title } = action.payload;
  try {
    yield Meteor.callPromise('propertyGroups.insert', title);
  } catch (e) {
    console.warn('error', e);
  }
}

function* removePropertyGroup(action) {
  const { id } = action.payload;
  try {
    yield Meteor.callPromise('propertyGroups.remove', id);
  } catch (e) {
    console.warn('error', e);
  }
}

function* propertyGroupsSaga() {
  yield takeLatest(types.ADD_PROPERTY_GROUP_REQUEST, createPropertyGroup);
  yield takeLatest(types.DELETE_PROPERTY_GROUP_REQUEST, removePropertyGroup);
}

export default propertyGroupsSaga;