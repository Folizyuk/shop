import { Meteor } from 'meteor/meteor';
import { takeLatest, call, put } from 'redux-saga/effects';
import * as types from './../actions/actionTypes';
import { loginUser } from './../actions/userCreators';
import {
  signUpUser,
  signInUser
} from './../api';

function* registerUser(action) {
  const { user } = action.payload;
  try {
    let data;
    try {
      data = yield call(signUpUser, user);
    } catch (err) {
      console.warn('error', e);
      return;
    }

    console.log(Meteor.user())
    console.log(Meteor.userId())
    const { id, token, tokenExpires } = data;
    //yield put(loginUser(user));
  } catch (e) {
    console.warn('error', e);
  }
}

function* signUser(action) {
  console.log(action)
  const { user } = action.payload;
  try {
    const data = yield call(signInUser, user);
    console.log(data)
    console.log(Meteor.userId())
    console.log(Meteor.user())

    const { id, token, tokenExpires } = data;

    //yield put(push(`/admin/products`));
  } catch (e) {
    console.warn('error', e);
  }
}

function* filtersSaga() {
  yield takeLatest(types.USER_REGISTER_REQUEST, registerUser);
  yield takeLatest(types.USER_LOGIN_REQUEST, signUser);
}

export default filtersSaga;