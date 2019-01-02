import { FILTERS, FILTERS_SUBSCRIPTION_CHANGED, FILTERS_SUBSCRIPTION_READY } from '../actions/actionTypes';
import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';

const initialState = {
  ready: false,
  subscriptionStop: false,
  data: []
};

function filters(state = initialState, action) {
  switch (action.type) {
    case FILTERS_SUBSCRIPTION_READY:
      if (state.ready === action.payload.ready) return state;
      return {
        ...state,
        ready: action.payload.ready
      };
    case FILTERS_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        data: [...action.payload.filters],
      };
    case STOP_SUBSCRIPTION:
      return action.payload === FILTERS
        ? { ...state, subscriptionStop: true }
        : state;
    default:
      return state
  }
}

export default filters