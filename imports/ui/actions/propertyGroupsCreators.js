import { Meteor } from 'meteor/meteor';
import { startSubscription, stopSubscription } from 'meteor-redux-middlewares';
import { PropertyGroups } from '/imports/api/propertyGroups';

import * as types from './actionTypes';

/** PROPERTY GROUPS*/

export const subscribePropertyGroups = () => {
  return startSubscription({
    key: types.PROPERTY_GROUPS,
    get: () => {
      return {
        propertyGroups: PropertyGroups.find({}).fetch(),
      }
    },
    subscribe: () => Meteor.subscribe(types.PROPERTY_GROUPS),
  });
};

export const unsubscribePropertyGroups = () => stopSubscription(types.PROPERTY_GROUPS);