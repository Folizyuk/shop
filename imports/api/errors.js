import { Meteor } from 'meteor/meteor';

export const get404 = (type = 'not-matched', msg) => {
  const error = new Meteor.Error(type, msg);
  error.statusCode = 404;
  error.message = msg;
  return error;
};

export const get400 = (type = 'error', msg) => {
  const error = new Meteor.Error(type, msg);
  error.statusCode = 400;
  error.message = msg;
  return error;
};