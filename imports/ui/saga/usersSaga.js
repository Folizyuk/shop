import { Meteor } from 'meteor/meteor';
import { takeLatest, call, put } from 'redux-saga/effects';
import * as types from './../actions/actionTypes';
import { loginUser } from './../actions/userCreators';
import { showModal } from './../actions/modalsCreators';
import {
  signUpUser,
  signInUser
} from './../api';

function* registerUser(action) {
  const { user } = action.payload;

  const { response, error } = yield call(signUpUser, user);
  if (response) {
    yield put(loginUser(user));
  } else {
    yield put(showModal(types.MODAL_TYPE_ALERT, { text: error.reason }));
  }
}

function* signUser(action) {
  const { user } = action.payload;

  const { response, error } = yield call(signInUser, user);
  if (response) {
    yield put({type: types.USER_LOGIN_SUCCESS, payload: response});
    yield put({type: types.HIDE_MODAL});
  } else {
    yield put(showModal(types.MODAL_TYPE_ALERT, { text: error.reason }));
  }
}


function* signoutUser(action) {
  const { user } = action.payload;

  yield put({type: types.USER_LOGOUT_SUCCESS});
}


function* usersSaga() {
  yield takeLatest(types.USER_REGISTER_REQUEST, registerUser);
  yield takeLatest(types.USER_LOGIN_REQUEST, signUser);
  yield takeLatest(types.USER_LOGOUT_REQUEST, signoutUser);
}

export default usersSaga;