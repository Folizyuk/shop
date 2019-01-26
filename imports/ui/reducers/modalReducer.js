import * as types from './../actions/actionTypes';

const initialState = {
  type: null,
  props: {}
};

function modalReducer (state = initialState, action) {
  switch (action.type) {
    case types.SHOW_MODAL:
      return {
        ...state,
        type: action.payload.type,
        props: action.payload.props
      };
    case types.HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}

export default modalReducer;
