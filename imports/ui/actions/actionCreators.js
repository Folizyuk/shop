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


