import { Meteor } from 'meteor/meteor';

export default class ApiHelpers {

  static get404 = (type = 'not-matched', msg) => {
    const error = new Meteor.Error(type, msg);
    error.statusCode = 404;
    error.message = msg;
    return error;
  };

  static get400 = (type = 'error', msg) => {
    const error = new Meteor.Error(type, msg);
    error.statusCode = 400;
    error.message = msg;
    return error;
  };

  static get401 = (msg = 'user is not authorized') => {
    const error = new Meteor.Error('not-authorized', msg);
    error.statusCode = 401;
    error.message = msg;
    return error;
  };

  static checkIsLogedIn = (authToken, userId) => {
    if (authToken && userId) return true;
    else throw ApiHelpers.get401();
  };

}

