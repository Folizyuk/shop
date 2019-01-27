import { Meteor } from 'meteor/meteor';

import * as types from './actionTypes';

export const addProductToCart = (product) => {
  return {
    type: types.CART_ADD_PRODUCT_REQUEST,
    payload: {
      product: product
    }
  }
};
