/*import { Meteor } from 'meteor/meteor';

function getTodos() {
  return async function(dispatch) {
    const widgets = await Meteor.callPromise('tasks.fetch');

    return dispatch({
      type: 'GET_TODOS',
      payload: widgets
    });
  }
}

export default {
  getTodos
}*/

import { Meteor } from 'meteor/meteor';
import { startSubscription, registerReactiveSource } from 'meteor-redux-middlewares';
import { Tasks } from '/imports/api/tasks';

export const TASKS_SUBSCRIPTION_READY = 'TASKS_SUBSCRIPTION_READY';
export const TASKS_SUBSCRIPTION_CHANGED = 'TASKS_SUBSCRIPTION_CHANGED';
export const TASKS = 'tasks';
/*
export const getTasks = () => {
  registerReactiveSource({
    key: 'user',
    get: () => Meteor.user() || {},
    //subscribe: () => Meteor.subscribe(TASKS),
  });
};*/

/*export const getTasks = () => registerReactiveSource({
  key: 'user',
  get: () => Meteor.user() || {},
});*/

export const getTasks = () => {
  return startSubscription({
    key: TASKS,
    get: () => {
      return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
      }
    },
    subscribe: () => Meteor.subscribe(TASKS),
  });
};


