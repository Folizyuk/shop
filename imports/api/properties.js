import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import * as types from '../ui/actions/actionTypes';
import options from './collectionConfig';

export const Properties = new Mongo.Collection('properties', options);
Properties.schema = new SimpleSchema({
  //_id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  title: {type: String, min: 3},
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish(types.PROPERTIES, function propertiesPublication() {
    return Properties.find();
  });
}

Meteor.methods({
  'properties.insert'(title) {
    Properties.schema.validate({title}, {keys: ['title']});
    return Properties.insert({ title });
  },
  'properties.remove'(_id) {
    //Properties.schema.validate({_id}, {keys: ['_id']});
    return Properties.remove(_id);
  },
  'properties.update'({id, title}) {
    Properties.schema.validate({title});
    Properties.update(id, {
      $set: { title: title }
    });
  },
});
