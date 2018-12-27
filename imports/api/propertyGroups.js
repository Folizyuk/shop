import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import * as types from '../ui/actions/actionTypes';

export const PropertyGroups = new Mongo.Collection('propertyGroups');
PropertyGroups.schema = new SimpleSchema({
  title: {type: String},
  _id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish(types.PROPERTY_GROUPS, function propertyGroupsPublication() {
    return PropertyGroups.find();
  });
}

Meteor.methods({
  'propertyGroups.insert'(title) {

    PropertyGroups.schema.validate({title});

    return PropertyGroups.insert({
      title
    });
  },
});
