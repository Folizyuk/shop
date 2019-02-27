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
      const {minPrice, maxPrice} = data;

      if (typeof minPrice !== 'undefined' && typeof maxPrice !== 'undefined') {
        return {
          products: Products.find({price: { $gte: minPrice, $lte: maxPrice}}).fetch(),
        }
      } else {
        return {
          products: Products.find({}).fetch(),
        }
      }
    },
    subscribe: () => Meteor.subscribe(types.PRODUCTS, checkUpdate()),
  });
};

export const unsubscribeProducts = () => stopSubscription(types.PRODUCTS);


