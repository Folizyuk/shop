import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import * as types from '../ui/actions/actionTypes';
import options from './collectionConfig';
import { get404, get400 } from './errors';

import Helpers from '../ui/helpers';

export const Products = new Mongo.Collection('products', options);
Products.schema = new SimpleSchema({
  name: {type: String, min: 3, required: true},
  image: {type: String, optional: true},
  brand: {type: String, optional: true},
  price: {type: Number, required: true},
  screen_size: {type: Number, optional: true, min: 1},
  connectivity: {type: String, optional: true, min: 2},
  processor: {type: String, optional: true, min: 2},
  camera_resolution: {type: Number, optional: true, min: 0.1},
  storage_capacity: {type: Number, optional: true, min: 0.1},
  color: {type: String, optional: true,  min: 3},

  /*properties: {type: Array},
  'properties.$': Object,
  'properties.$.prop_id': Object,
  'properties.$.prop_id._str': String,
  'properties.$.value': SimpleSchema.oneOf(String, Number),*/
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish(types.PRODUCTS, function productPublication(data) {
    if (Helpers.isEmptyObj(data)) {
      return Products.find({}, { sort: { createdAt: -1 } });
    }

    const {minPrice, maxPrice} = data;
    return Products.find(
      { price: {$gte: minPrice, $lte: maxPrice } },
      { sort: { createdAt: -1 } }
    );
  });

  // Handle errors specifically for the login routes correctly
  JsonRoutes.ErrorMiddleware.use('/products', RestMiddleware.handleErrorAsJson);

  JsonRoutes.setResponseHeaders({
    "Cache-Control": "no-store",
    "Pragma": "no-cache",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization, X-Requested-With"
  });

  JsonRoutes.add('options', '/products', function (req, res) {
    JsonRoutes.sendResult(res);
  });

  JsonRoutes.add('get', '/products', function (req, res, next) {
    JsonRoutes.sendResult(res, {
      data:Products.find().fetch()
    });
  });

  JsonRoutes.add('post', '/products', function (req, res, next) {
    const product = req.body;

    try {
      //Products.schema.validate(product, {keys: ['name']});
      Products.schema.validate(product);
    } catch (e) {
      throw get400('not-valid', e.message);
    }

    const newProductId = Products.insert(product);
    if (!newProductId) throw get400('error', `product was not created`);

    JsonRoutes.sendResult(res, {
      data: Products.findOne({_id: newProductId})
    });
  });

  JsonRoutes.add('put', '/products/:id', function (req, res, next) {
    const id = req.params.id;
    const {_id, ...product} = req.body;
    const parsedId = Helpers.parseMongoID(id);

    try {
      Products.schema.validate({...product});
    } catch (e) {
      throw get400('not-valid', e.message);
    }

    const findProduct = Products.findOne({_id: parsedId});
    if (!findProduct) throw get404('not-found', `product with id=${_id} not found`);

    const update = Products.update(parsedId, { $set: { ...product } });
    if (!update) throw get400('error', `product with id=${_id} was not updated`);

    JsonRoutes.sendResult(res, {
      data: Products.findOne({_id: parsedId})
    });
  });

  JsonRoutes.add('delete', '/products/:id', function (req, res, next) {
    const { _id } = req.params;
    const parsedId = Helpers.parseMongoID(_id);

    const product = Products.findOne({_id: parsedId});
    if (!product) throw get404('not-found', `product with id=${_id} not found`);

    const result = Products.remove(parsedId);
    if (!result) throw get400('error', `product with id=${_id} was not deleted`);

    JsonRoutes.sendResult(res, { data: product });
  });

}
