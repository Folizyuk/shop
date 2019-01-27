import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';
import options from './collectionConfig';
import { get404, get400 } from './errors';

if (Meteor.isServer) {
  JsonRoutes.Middleware.use(JsonRoutes.Middleware.parseBearerToken);
  JsonRoutes.Middleware.use(JsonRoutes.Middleware.authenticateMeteorUserByToken);

  // Handle errors specifically for the login routes correctly
  JsonRoutes.ErrorMiddleware.use(RestMiddleware.handleErrorAsJson);

  JsonRoutes.add('options', '/myusers/mylogin', function (req, res) {
    JsonRoutes.sendResult(res);
  });

  JsonRoutes.add('post', '/myusers/mylogin', function (req, res) {
    const options = req.body;

    let user;
    if (options.hasOwnProperty('email')) {
      check({email: options.email, password: options.password}, {
        email: String,
        password: String,
      });
      user = Meteor.users.findOne({ 'emails.address': options.email });
    }

    if (!user) {
      throw get404('not-found', 'User with that username or email address not found.');
    }

    const result = Accounts._checkPassword(user, options.password);
    check(result, {
      userId: String,
      error: Match.Optional(Meteor.Error),
    });

    if (result.error) {
      throw get400('not-matched', 'Email or password is invalid.');
    }

    const stampedLoginToken = Accounts._generateStampedLoginToken();
    check(stampedLoginToken, {
      token: String,
      when: Date,
    });

    Accounts._insertLoginToken(result.userId, stampedLoginToken);

    const tokenExpiration = Accounts._tokenExpiration(stampedLoginToken.when);
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