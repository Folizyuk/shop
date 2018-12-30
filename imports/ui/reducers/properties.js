import {
  PROPERTIES,
  PROPERTIES_SUBSCRIPTION_READY,
  PROPERTIES_SUBSCRIPTION_CHANGED
} from '../actions/actionTypes';
import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';

const initialState = {
  ready: false,
  subscriptionStop: false,
  data: []
};

function properties(state = initialState, action) {
  switch (action.type) {
    case PROPERTIES_SUBSCRIPTION_READY:
      if (state.ready === action.payload.ready) return state;
      return {
        ...state,
        ready: action.payload.ready
      };
    case PROPERTIES_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        data: [...action.payload.properties],
      };
    case STOP_SUBSCRIPTION:
      return action.payload === PROPERTIES
        ? { ...state, subscriptionStop: true }
        : state;
    default:
      return state
  }
}

export default properties