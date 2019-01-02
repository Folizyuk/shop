import {
  FILTER,
  FILTER_SUBSCRIPTION_READY,
  FILTER_SUBSCRIPTION_CHANGED
} from '../actions/actionTypes';
import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';

const initialState = {
  ready: false,
  subscriptionStop: false,
  data: {}
};

function filter(state = initialState, action) {
  switch (action.type) {
    case STOP_SUBSCRIPTION:
      return action.payload === FILTER
        ? { ...initialState, subscriptionStop: true }
        : state;
    case FILTER_SUBSCRIPTION_READY:
      if (state.ready === action.payload.ready) return state;
      return {
        ...state,
        ready: action.payload.ready
      };
    case FILTER_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        data: {...action.payload.filter},
      };
    default:
      return state
  }
}

export default filter