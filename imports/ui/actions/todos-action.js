import { Meteor } from 'meteor/meteor';

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
}
