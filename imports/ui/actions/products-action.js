import { Meteor } from 'meteor/meteor';
import { startSubscription, registerReactiveSource } from 'meteor-redux-middlewares';
import { Products } from '/imports/api/products';

import * as types from './actionTypes';

export const PRODUCTS_SUBSCRIPTION_READY = 'PRODUCTS_SUBSCRIPTION_READY';
export const PRODUCTS_SUBSCRIPTION_CHANGED = 'PRODUCTS_SUBSCRIPTION_CHANGED';
export const PRODUCTS = 'products';

export const getProducts = () => {
  return startSubscription({
    key: PRODUCTS,
    get: () => {
      return {
        products: Products.find({}, { sort: { createdAt: -1 } }).fetch(),
      }
    },
    subscribe: () => Meteor.subscribe(PRODUCTS),
  });
};


