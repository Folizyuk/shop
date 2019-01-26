export const get404 = (msg) => {
  const error = new Meteor.Error('error', msg);
  error.statusCode = 404;
  error.message = msg;
  return error;
};