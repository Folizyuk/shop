import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import * as types from '../ui/actions/actionTypes';
import options from './collectionConfig';

export const Filters = new Mongo.Collection('filters', options);
Filters.schema = new SimpleSchema({
  title: {type: String, min: 3},
  filter_by: {type: Array},
  'filter_by.$': Object,
  'filter_by.$.prop_id': Object,
  'filter_by.$.prop_id._str': String,
  'filter_by.$.title': String,
  //_id: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish(types.FILTERS, function filtersPublication() {
    return Filters.find();
  });
}

Meteor.methods({
  'filter.insert'(filter) {
    Filters.schema.validate(filter);
    return Filters.insert(filter);
  },
  'filter.remove'(_id) {
    return Filters.remove(_id);
  },
  'filter.update'({id, ...filter}) {
    Filters.schema.validate(filter);
    Filters.update(id, {
      $set: { ...filter }
    });
  },
});
