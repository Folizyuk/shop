import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  id: null,
  token: null,
  tokenExpires: null,
  username: null
};

function product(state = initialState, action) {
  switch (action.type) {

    case USER_LOGIN_SUCCESS:
      return { ...state, ...action.payload };

    case USER_LOGOUT_SUCCESS:
      return initialState;

    default:
      return state
  }
}

export default product