import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import * as types from '../ui/actions/actionTypes';
import options from './collectionConfig';
import { get404 } from './errors';

import Helpers from '../ui/helpers';

export const Products = new Mongo.Collection('products', options);
Products.schema = new SimpleSchema({
  name: {type: String, min: 3},
  image: {type: String, optional: true},
  price: {type: Number, required: true},
  properties: {type: Array},
  'properties.$': Object,
  'properties.$.prop_id': Object,
  'properties.$.prop_id._str': String,
  'properties.$.value': SimpleSchema.oneOf(String, Number),
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


  JsonRoutes.Middleware.use(JsonRoutes.Middleware.parseBearerToken);
  JsonRoutes.Middleware.use(JsonRoutes.Middleware.authenticateMeteorUserByToken);

// Handle errors specifically for the login routes correctly
  JsonRoutes.ErrorMiddleware.use('/products', RestMiddleware.handleErrorAsJson);

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
      Products.schema.validate(product, {keys: ['name', 'properties']});
    } catch (e) {
      throw get404(e.message);
    }

    const newProductId = Products.insert(product);
    if (!newProductId) throw get404(`product was not created`);

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
      throw get404(e.message);
    }

    const findProduct = Products.findOne({_id: parsedId});
    if (!findProduct) throw get404(`product with id=${_id} not found`);

    const update = Products.update(parsedId, { $set: { ...product } });
    if (!update) throw get404(`product with id=${_id} was not updated`);

    JsonRoutes.sendResult(res, {
      data: Products.findOne({_id: parsedId})
    });
  });

  JsonRoutes.add('delete', '/products/:id', function (req, res, next) {
    const { _id } = req.params;
    const parsedId = Helpers.parseMongoID(_id);

    const product = Products.findOne({_id: parsedId});
    if (!product) throw get404(`product with id=${_id} not found`);

    const result = Products.remove(parsedId);
    if (!result) throw get404(`product with id=${_id} was not deleted`);

    JsonRoutes.sendResult(res, { data: product });
  });
}

/*
Meteor.methods({
  'tasks.fetch'() {
    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const tasks = Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });

    return tasks.fetch();
  },
  'tasks.insert'(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'tasks.remove'(taskId) {
    check(taskId, String);

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
  'tasks.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Tasks.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { private: setToPrivate } });
  },
});*/
