import { Meteor } from 'meteor/meteor';
import { startSubscription, stopSubscription } from 'meteor-redux-middlewares';
import { Orders } from '/imports/api/orders';
import { Products } from '/imports/api/products';

import * as types from './actionTypes';

export const subscribeOrders = () => {
  return startSubscription({
    key: types.ORDERS,
    get: () => {
      const orderItems = Orders.find().fetch();

      const items = orderItems.map(item => {
        return {
          ...item,
          products: item.products.map(product => {
            return {
              count: product.count,
              ...Products.findOne({_id: product.productId})
            }
          })
        }
      });

      return { orders: items }
    },
    subscribe: () => Meteor.subscribe(types.ORDERS),
  });
};

export const unsubscribeOrders = () => stopSubscription(types.ORDERS);


export const addOrdersItem = (order) => {
  return {
    type: types.ORDERS_ADD_ITEM_REQUEST,
    payload: { order }
  }
};

/*export const updateOrdersItem = (cart, properties) => {
  return {
    type: types.CART_UPDATE_ITEM_REQUEST,
    payload: { cart: { ...cart, ...properties } }
  }
};

export const deleteOrdersItem = (id) => {
  return {
    type: types.CART_DELETE_ITEM_REQUEST,
    payload: {
      id
    }
  }
};*/
