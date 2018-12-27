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

function* propertyGroupsSaga() {
  yield takeLatest(types.ADD_PROPERTY_GROUP_REQUEST, createPropertyGroup);
}

export default propertyGroupsSaga;