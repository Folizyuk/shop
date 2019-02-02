import { Meteor } from 'meteor/meteor';
import { startSubscription, stopSubscription } from 'meteor-redux-middlewares';
import { Cart } from '/imports/api/cart';
import { Products } from '/imports/api/products';

import * as types from './actionTypes';

export const subscribeCart = () => {
  return startSubscription({
    key: types.CART,
    get: () => {
      const cartItems = Cart.find().fetch();
      const items = cartItems.map(item => {
        return {
          ...item,
          product: Products.findOne({_id: item.productId})
        }
      });

      return { cart: items }
    },
    subscribe: () => Meteor.subscribe(types.CART),
  });
};

export const unsubscribeCart = () => stopSubscription(types.CART);


export const addCartItem = (productId, count) => {
  const payload = { productId };
  count >= 0 ? payload.count = count : null;

  return {
    type: types.CART_ADD_ITEM_REQUEST,
    payload: payload
  }
};

export const updateCartItem = (cart, properties) => {
  return {
    type: types.CART_UPDATE_ITEM_REQUEST,
    payload: { cart: { ...cart, ...properties } }
  }
};

export const deleteCartItem = (id) => {
  return {
    type: types.CART_DELETE_ITEM_REQUEST,
    payload: {
      id
    }
  }
};
