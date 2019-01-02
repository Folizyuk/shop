import { Meteor } from 'meteor/meteor';
import { startSubscription, stopSubscription } from 'meteor-redux-middlewares';
import { Filters } from '/imports/api/filters';

import * as types from './actionTypes';

/** FILTERS */

export const subscribeFilters = () => {
  return startSubscription({
    key: types.FILTERS,
    get: () => {
      return {
        filters: Filters.find({}, { sort: { createdAt: -1 } }).fetch(),
      }
    },
    subscribe: () => Meteor.subscribe(types.FILTERS),
  });
};

export const unsubscribeFilters = () => stopSubscription(types.FILTERS);

export const subscribeFilter = (id) => {
  const _id = typeof id === 'string' ? new Meteor.Collection.ObjectID(id) : id;
  return startSubscription({
    key: types.FILTER,
    get: () => {
      return {
        filter: Filters.findOne(_id),
      }
    },
    subscribe: () => Meteor.subscribe(types.FILTERS),
  });
};

export const unsubscribeFilter = () => stopSubscription(types.FILTER);

export const addFilter = (filter) => {
  return {
    type: types.ADD_FILTER_REQUEST,
    payload: {
      filter
    }
  }
};

export const updateFilter = (filter) => {
  return {
    type: types.UPDATE_FILTER_REQUEST,
    payload: { filter }
  }
};

export const deleteFilter = (id) => {
  return {
    type: types.DELETE_PRODUCT_REQUEST,
    payload: {
      id
    }
  }
};