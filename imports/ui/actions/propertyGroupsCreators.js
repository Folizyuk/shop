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

export const addPropertyGroup = (title) => {
  return {
    type: types.ADD_PROPERTY_GROUP_REQUEST,
    payload: {
      title
    }
  }
};

export const deletePropertyGroup = (id) => {
  return {
    type: types.DELETE_PROPERTY_GROUP_REQUEST,
    payload: {
      id
    }
  }
};

export const updatePropertyGroup = (id, title) => {
  return {
    type: types.UPDATE_PROPERTY_GROUP_REQUEST,
    payload: {
      id, title
    }
  }
};