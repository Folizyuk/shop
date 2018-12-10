import { PRODUCTS, PRODUCTS_SUBSCRIPTION_CHANGED, PRODUCTS_SUBSCRIPTION_READY } from '../actions/products-action';
import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';

const initialState = {
  ready: false,
  subscriptionStop: false,
  products: []
};

function products(state = initialState, action) {
  switch (action.type) {
    case PRODUCTS_SUBSCRIPTION_READY:
      if (state.ready === action.payload.ready) return state;
      return {
        ...state,
        ready: action.payload.ready
      };
    case PRODUCTS_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        products: [...action.payload.products],
        incompleteCount: action.payload.incompleteCount,
      };
    case STOP_SUBSCRIPTION:
      return action.payload === PRODUCTS
        ? { ...state, subscriptionStop: true }
        : state;
    default:
      return state
  }
}

export default products