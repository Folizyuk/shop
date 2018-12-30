import { Meteor } from 'meteor/meteor';
import { takeLatest } from 'redux-saga/effects';
import * as types from './../actions/actionTypes';

function* createProperty(action) {
  const { title } = action.payload;
  try {
    yield Meteor.callPromise('properties.insert', title);
  } catch (e) {
    console.warn('error', e);
  }
}

function* removeProperty(action) {
  const { id } = action.payload;
  try {
    yield Meteor.callPromise('properties.remove', id);
  } catch (e) {
    console.warn('error', e);
  }
}

function* updateProperty(action) {
  const { id, title } = action.payload;
  try {
    yield Meteor.callPromise('properties.update', {id, title});
  } catch (e) {
    console.warn('error', e);
  }
}

function* propertySaga() {
  yield takeLatest(types.ADD_PROPERTY_REQUEST, createProperty);
  yield takeLatest(types.DELETE_PROPERTY_REQUEST, removeProperty);
  yield takeLatest(types.UPDATE_PROPERTY_REQUEST, updateProperty);
}

export default propertySaga;