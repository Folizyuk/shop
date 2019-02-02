import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import * as types from '../ui/actions/actionTypes';
import options from './collectionConfig';

import Helpers from '../ui/helpers';
import ApiHelpers from './ApiHelpers';
import { Products } from './products';

export const Cart = new Mongo.Collection('cart', options);

import { publishComposite } from 'meteor/reywood:publish-composite';

Cart.schema = new SimpleSchema({
  userId: {type: String, min: 3, optional: true},
  productId: {type: String, min: 3, optional: true},
  count: {type: Number, optional: true, min: 1},
});

if (Meteor.isServer) {

  publishComposite(types.CART, {
    find() {
      return Cart.find();
    },
    children: [
      {
        find(cartItem) {
          return Products.find({_id: cartItem.productId});
        }
      }
    ]
  });

  JsonRoutes.add('options', '/cart', function (req, res) {
    JsonRoutes.sendResult(res);
  });

  JsonRoutes.add('get', '/cart', function (req, res, next) {

  });

  JsonRoutes.add('post', '/cart', function (req, res, next) {
    ApiHelpers.checkIsLogedIn(req.authToken, req.userId);

    const body = req.body,
          userId = req.userId,
          count = body.count > 0 ? body.count : 1;

    const reqBody = { userId, productId: Helpers.toMongoID(body.productId), count };

    try {
      Cart.schema.validate(reqBody, {keys: ['count', 'userId']});
    } catch (e) {
      throw get400('not-valid', e.message);
    }

    const find = Cart.findOne({productId: reqBody.productId, userId: userId});

    let cartItem = null;

    if (!find) {
      cartItem = Cart.insert(reqBody);
    } else {
      Cart.update({
        productId: reqBody.productId,
        userId: userId
      }, { $set: { count: find.count + 1 } });
      cartItem = Cart.findOne({productId: reqBody.productId, userId: userId});
    }

    JsonRoutes.sendResult(res, { data: cartItem });
  });

  JsonRoutes.add('put', '/cart/:id', function (req, res, next) {
    ApiHelpers.checkIsLogedIn(req.authToken, req.userId);

    const id = req.params.id;
    const {_id, ...cartItem} = req.body;
    const parsedId = Helpers.toMongoID(id);

    const reqBody = {
      userId: req.userId,
      ...cartItem,
      productId: Helpers.toMongoID(cartItem.productId)
    };

    try {
      Cart.schema.validate(reqBody, {keys: ['count', 'userId']});
    } catch (e) {
      throw ApiHelpers.get400('not-valid', e.message);
    }

    const findCart = Cart.findOne({_id: parsedId});
    if (!findCart) throw ApiHelpers.get404('not-found', `cartItem with id=${_id} not found`);

    const update = Cart.update(parsedId, { $set: { ...reqBody } });
    if (!update) throw ApiHelpers.get400('error', `cartItem with id=${_id} was not updated`);

    JsonRoutes.sendResult(res, {
      data: Cart.findOne({productId: reqBody.productId, userId: req.userId})
    });
  });

  JsonRoutes.add('delete', '/cart/:id', function (req, res, next) {
    ApiHelpers.checkIsLogedIn(req.authToken, req.userId);

    const { _id } = req.params;
    const parsedId = Helpers.toMongoID(_id);

    const cartItem = Cart.findOne({_id: parsedId, userId: req.userId});
    if (!cartItem) throw ApiHelpers.get404('not-found', `cartItem with id=${_id} not found`);

    const result = Cart.remove(parsedId);
    if (!result) throw ApiHelpers.get400('error', `cartItem with id=${_id} was not deleted`);

    JsonRoutes.sendResult(res, { data: cartItem });
  });
}
