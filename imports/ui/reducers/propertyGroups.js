import {
  PROPERTY_GROUPS,
  PROPERTY_GROUPS_SUBSCRIPTION_READY,
  PROPERTY_GROUPS_SUBSCRIPTION_CHANGED
} from '../actions/actionTypes';
import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';

const initialState = {
  ready: false,
  subscriptionStop: false,
  propertyGroups: []
};

function propertyGroups(state = initialState, action) {
  switch (action.type) {
    case PROPERTY_GROUPS_SUBSCRIPTION_READY:
      if (state.ready === action.payload.ready) return state;
      return {
        ...state,
        ready: action.payload.ready
      };
    case PROPERTY_GROUPS_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        propertyGroups: [...action.payload.propertyGroups],
      };
    case STOP_SUBSCRIPTION:
      return action.payload === PROPERTY_GROUPS
        ? { ...state, subscriptionStop: true }
        : state;
    default:
      return state
  }
}

export default propertyGroups