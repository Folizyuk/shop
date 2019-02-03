import { ORDERS, ORDERS_SUBSCRIPTION_READY, ORDERS_SUBSCRIPTION_CHANGED } from '../actions/actionTypes';
import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';

const initialState = {
  ready: false,
  subscriptionStop: false,
  data: []
};

function orders(state = initialState, action) {
  switch (action.type) {
    case ORDERS_SUBSCRIPTION_READY:
      if (state.ready === action.payload.ready) return state;
      return {
        ...state,
        ready: action.payload.ready
      };
    case ORDERS_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        data: [...action.payload.orders],
      };
    case STOP_SUBSCRIPTION:
      return action.payload === ORDERS
        ? { ...initialState, subscriptionStop: true }
        : state;
    default:
      return state
  }
}

export default orders;