import { Meteor } from 'meteor/meteor';
import { startSubscription, stopSubscription } from 'meteor-redux-middlewares';
import { Products } from '/imports/api/products';

import * as types from './actionTypes';

/** PRODUCTS */

export const subscribeProducts = (data) => {

  const checkUpdate = () => {
    return data;
  };

  return startSubscription({
    key: types.PRODUCTS,
    get: () => {
      return {
        products: Products.find().fetch(),
      }
    },
    subscribe: () => Meteor.subscribe(types.PRODUCTS, checkUpdate()),
  });
};

export const unsubscribeProducts = () => stopSubscription(types.PRODUCTS);


