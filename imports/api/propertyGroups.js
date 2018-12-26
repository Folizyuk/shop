import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import * as types from '../ui/actions/actionTypes';

export const PropertyGroups = new Mongo.Collection('propertyGroups');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish(types.PROPERTY_GROUPS, function propertyGroupsPublication() {
    return PropertyGroups.find();
  });
}
