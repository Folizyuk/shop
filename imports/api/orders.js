import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import * as types from '../ui/actions/actionTypes';
import options from './collectionConfig';

import Helpers from '../ui/helpers';
import ApiHelpers from '../../imports/api/ApiHelpers';

import { Products } from './products';

import { publishComposite } from 'meteor/reywood:publish-composite';

export const Orders = new Mongo.Collection('orders', options);
Orders.schema = new SimpleSchema({
  userId: {type: String, min: 3, optional: true},
  products: {type: Array},
  'products.$': Object,
  'products.$.productId': Object,
  'products.$.productId._str': String,
  'products.$.count': {type: Number, optional: true, min: 1},
  status: {type: String, optional: true},
});

if (Meteor.isServer) {

  publishComposite(types.ORDERS, {
    find() {
      return Orders.find();
    },
    children: [
      {
        find(order) {
          /*return Products.find({_id: order.products[0].productId});

          return order.products.map(product => {
            return Products.find({_id: { $in: order.products.map(item => item.productId)}});
          });
*/
          return Products.find({_id: { $in: order.products.map(item => item.productId)}});
        }
      },
    ]
  });

  // Handle errors specifically for the login routes correctly
  JsonRoutes.ErrorMiddleware.use('/orders', RestMiddleware.handleErrorAsJson);

  JsonRoutes.setResponseHeaders({
    "Cache-Control": "no-store",
    "Pragma": "no-cache",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization, X-Requested-With"
  });

  JsonRoutes.add('options', '/orders', function (req, res) {
    JsonRoutes.sendResult(res);
  });

  JsonRoutes.add('get', '/orders', function (req, res, next) {
    JsonRoutes.sendResult(res, {
      data: Orders.find().fetch()
    });
  });

  JsonRoutes.add('post', '/orders', function (req, res, next) {
    ApiHelpers.checkIsLogedIn(req.authToken, req.userId);

    const body = req.body, userId = req.userId;

    const products = body.products.map(item => {
      return {
        ...item,
        productId: Helpers.toMongoID(item.productId)
      }
    });

    const reqBody = { userId, products, status: 'check-order' };

    try {
      Orders.schema.validate(reqBody); // {keys: ['count', 'userId', 'products']}
    } catch (e) {
      throw Helpers.get400('not-valid', e.message);
    }

    let _id = Orders.insert(reqBody);

    JsonRoutes.sendResult(res, { data: Orders.findOne({_id: _id}) });
  });

  /*JsonRoutes.add('put', '/orders/:id', function (req, res, next) {
    const id = req.params.id;
    const {_id, ...product} = req.body;
    const parsedId = Helpers.toMongoID(id);

    try {
      Orders.schema.validate({...product});
    } catch (e) {
      throw get400('not-valid', e.message);
    }

    const findProduct = Orders.findOne({_id: parsedId});
    if (!findProduct) throw get404('not-found', `product with id=${_id} not found`);

    const update = Orders.update(parsedId, { $set: { ...product } });
    if (!update) throw get400('error', `product with id=${_id} was not updated`);

    JsonRoutes.sendResult(res, {
      data: Orders.findOne({_id: parsedId})
    });
  });

  JsonRoutes.add('delete', '/orders/:id', function (req, res, next) {
    const { _id } = req.params;
    const parsedId = Helpers.toMongoID(_id);

    const product = Orders.findOne({_id: parsedId});
    if (!product) throw get404('not-found', `product with id=${_id} not found`);

    const result = Orders.remove(parsedId);
    if (!result) throw get400('error', `product with id=${_id} was not deleted`);

    JsonRoutes.sendResult(res, { data: product });
  });*/

}
