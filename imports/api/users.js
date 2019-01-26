import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import * as types from '../ui/actions/actionTypes';
import options from './collectionConfig';
import { get404 } from './errors';

import Helpers from '../ui/helpers';

if (Meteor.isServer) {
  JsonRoutes.Middleware.use(JsonRoutes.Middleware.parseBearerToken);
  JsonRoutes.Middleware.use(JsonRoutes.Middleware.authenticateMeteorUserByToken);

// Handle errors specifically for the login routes correctly
  JsonRoutes.ErrorMiddleware.use('/users/mylogin', RestMiddleware.handleErrorAsJson);

  JsonRoutes.add('options', '/myusers/mylogin', function (req, res) {
    JsonRoutes.sendResult(res);
  });

  JsonRoutes.add('post', '/myusers/mylogin', function (req, res) {

    /*JsonRoutes.sendResult(res, {
      data: {
        id: 1,
      },
    });*/

    var options = req.body;

    var user;
    if (options.hasOwnProperty('email')) {
      /*check(options, {
        email: String,
        password: String,
      });*/
      user = Meteor.users.findOne({ 'emails.address': options.email });
      console.log('SUC0')
    } else {
      /*check(options, {
        username: String,
        password: String,
      });*/
      user = Meteor.users.findOne({ username: options.username });
    }

    console.log('SUC1')

    if (!user) {
      console.log('ERRORRR1')
      /*throw new Meteor.Error('not-found',
        'User with that username or email address not found.');*/
    }

    console.log('SUC2')

    var result = Accounts._checkPassword(user, options.password);
    /*check(result, {
      userId: String,
      error: Match.Optional(Meteor.Error),
    });*/

    console.log('SUC3')

    if (result.error) {
      console.log('ERRORRR2')
      //throw result.error;
    }

    console.log('SUC4')

    var stampedLoginToken = Accounts._generateStampedLoginToken();
    check(stampedLoginToken, {
      token: String,
      when: Date,
    });

    Accounts._insertLoginToken(result.userId, stampedLoginToken);

    var tokenExpiration = Accounts._tokenExpiration(stampedLoginToken.when);
    check(tokenExpiration, Date);

    JsonRoutes.sendResult(res, {
      data: {
        id: result.userId,
        token: stampedLoginToken.token,
        tokenExpires: tokenExpiration,
      },
    });

  });
}