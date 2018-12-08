import { TASKS_SUBSCRIPTION_CHANGED } from '../actions/tasks-action';

const initialState = {
  tasks: []
};

function tasks(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case TASKS_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        tasks: [...action.payload],
        loaded: true
      };
    default:
      return state
  }
}

export default tasks