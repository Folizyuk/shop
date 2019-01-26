import { Meteor } from 'meteor/meteor';

import * as types from './actionTypes';

export const registerUser = ({email, username, password}) => {
  return {
    type: types.USER_REGISTER_REQUEST,
    payload: {
      user: { email, username, password }
    }
  }
};

export const loginUser = ({email, username, password}) => {
  return {
    type: types.USER_LOGIN_REQUEST,
    payload: {
      user: { email, username, password }
    }
  }
};