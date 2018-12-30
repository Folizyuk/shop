import {
  PRODUCT,
  PRODUCT_SUBSCRIPTION_READY,
  PRODUCT_SUBSCRIPTION_CHANGED
} from '../actions/actionTypes';
import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';

const initialState = {
  ready: false,
  subscriptionStop: false,
  data: {}
};

function product(state = initialState, action) {
  switch (action.type) {
    case STOP_SUBSCRIPTION:
      return action.payload === PRODUCT
        ? { ...initialState, subscriptionStop: true }
        : state;
    case PRODUCT_SUBSCRIPTION_READY:
      if (state.ready === action.payload.ready) return state;
      return {
        ...state,
        ready: action.payload.ready
      };
    case PRODUCT_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        data: {...action.payload.product},
      };
    default:
      return state
  }
}

export default product