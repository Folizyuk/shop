import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import * as types from '../ui/actions/actionTypes';
import options from './collectionConfig';

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
  Meteor.publish(types.PRODUCTS, function productPublication() {
    return Products.find();
  });
}

Meteor.methods({
  'products'() {
    return Products.find({});
  },
  'product.insert'(product) {
    Products.schema.validate(product, {keys: ['name', 'properties']});
    return Products.insert(product);
  },
  'product.update'({_id, ...product}) {
    Products.schema.validate({...product});
    Products.update(_id, {
      $set: { ...product }
    });
  },
  'product.remove'(_id) {
    return Products.remove(_id);
  },
});

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
