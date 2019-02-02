import { CART, CART_SUBSCRIPTION_CHANGED, CART_SUBSCRIPTION_READY } from '../actions/actionTypes';
import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';

const initialState = {
  ready: false,
  subscriptionStop: false,
  data: []
};

function cart(state = initialState, action) {
  switch (action.type) {
    case CART_SUBSCRIPTION_READY:
      if (state.ready === action.payload.ready) return state;
      return {
        ...state,
        ready: action.payload.ready
      };
    case CART_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        data: [...action.payload.cart],
      };
    case STOP_SUBSCRIPTION:
      return action.payload === CART
        ? { ...initialState, subscriptionStop: true }
        : state;
    default:
      return state
  }
}

export default cart;