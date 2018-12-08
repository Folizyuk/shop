import { TASKS, TASKS_SUBSCRIPTION_CHANGED, TASKS_SUBSCRIPTION_READY } from '../actions/tasks-action';
import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';

const initialState = {
  ready: false,
  subscriptionStop: false,
  tasks: []
};

function tasks(state = initialState, action) {
  switch (action.type) {
    case TASKS_SUBSCRIPTION_READY:
      return {
        ...state,
        ready: action.payload.ready
      };
    case TASKS_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        tasks: [...action.payload],
        loaded: true
      };
    case STOP_SUBSCRIPTION:
      return action.payload === TASKS
        ? { ...state, subscriptionStop: true }
        : state;
    default:
      return state
  }
}

export default tasks