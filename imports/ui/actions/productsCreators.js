import { Meteor } from 'meteor/meteor';
import { startSubscription, stopSubscription } from 'meteor-redux-middlewares';
import { Products } from '/imports/api/products';

import * as types from './actionTypes';

/** PRODUCTS */

export const subscribeProducts = () => {
  return startSubscription({
    key: types.PRODUCTS,
    get: () => {
      return {
        products: Products.find({}, { sort: { createdAt: -1 } }).fetch(),
      }
    },
    subscribe: () => Meteor.subscribe(types.PRODUCTS),
  });
};

export const unsubscribeProducts = () => stopSubscription(types.PRODUCTS);

export const subscribeProduct = (id) => {
  const _id = typeof id === 'string' ? new Meteor.Collection.ObjectID(id) : id;
  return startSubscription({
    key: types.PRODUCT,
    get: () => {
      return {
        product: Products.findOne(_id),
      }
    },
    subscribe: () => Meteor.subscribe(types.PRODUCTS),
  });
};

export const unsubscribeProduct = () => stopSubscription(types.PRODUCT);

export const updateProduct = (product) => {
  return {
    type: types.UPDATE_PRODUCT_REQUEST,
    payload: { product }
  }
};