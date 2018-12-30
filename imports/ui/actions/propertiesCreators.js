import { Meteor } from 'meteor/meteor';
import { startSubscription, stopSubscription } from 'meteor-redux-middlewares';
import { Properties } from '/imports/api/properties';

import * as types from './actionTypes';

/** PROPERTIES*/

export const subscribeProperties = () => {
  return startSubscription({
    key: types.PROPERTIES,
    get: () => {
      return {
        properties: Properties.find({}).fetch(),
      }
    },
    subscribe: () => Meteor.subscribe(types.PROPERTIES),
  });
};

export const unsubscribeProperties = () => stopSubscription(types.PROPERTIES);

export const addProperty = (title) => {
  return {
    type: types.ADD_PROPERTY_REQUEST,
    payload: {
      title
    }
  }
};

export const deleteProperty = (id) => {
  return {
    type: types.DELETE_PROPERTY_REQUEST,
    payload: {
      id
    }
  }
};

export const updateProperty = (id, title) => {
  return {
    type: types.UPDATE_PROPERTY_REQUEST,
    payload: {
      id, title
    }
  }
};