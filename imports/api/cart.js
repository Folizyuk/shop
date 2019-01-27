import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import * as types from '../ui/actions/actionTypes';
import options from './collectionConfig';

import Helpers from '../ui/helpers';
import ApiHelpers from './ApiHelpers';

export const Cart = new Mongo.Collection('cart', options);

Cart.schema = new SimpleSchema({
  userId: {type: String, min: 3, required: true},
  productId: {type: String, min: 3, required: true},
  count: {type: Number, required: true, min: 1},
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish(types.CART, function productPublication(data) {
    if (Helpers.isEmptyObj(data)) {
      return Cart.find({}, { sort: { createdAt: -1 } });
    }

    return Cart.find({}, { sort: { createdAt: -1 } });
  });

  JsonRoutes.add('options', '/cart', function (req, res) {
    JsonRoutes.sendResult(res);
  });

  JsonRoutes.add('get', '/cart', function (req, res, next) {

  });

  JsonRoutes.add('post', '/cart', function (req, res, next) {
    const product = req.body;

    ApiHelpers.checkIsLogedIn(req.authToken, req.userId);

    JsonRoutes.sendResult(res, {
      data: product
    });
  });
}
