import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as types from './../actions/actionTypes';

function* addTask(action) {
  try {
    const user = yield Meteor.callPromise('tasks.insert', action.payload);
  } catch (e) {
    console.log('error', e);
  }
}

function* tasksSaga() {
  yield takeLatest(types.ADD_TASK_REQUEST, addTask);
}

export default tasksSaga;