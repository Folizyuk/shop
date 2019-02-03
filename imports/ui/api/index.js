import ApiService from './ApiService';

/** PRODUCTS */

export const createProduct = (product) => {
  return ApiService.post(`/products`, product);
};

export const updateProduct = (product) => {
  return ApiService.put(`/products/${product._id._str}`, product);
};

export const deleteProduct = (id) => {
  return ApiService.delete(`/products/${id}`);
};

/** USERS */

export const signUpUser = (user) => {
  return ApiService.post(`/users/register`, user);
};

export const signInUser = (user) => {
  return ApiService.post(`/myusers/mylogin`, user);
};

/** CART */

export const addCartItem = (product) => {
  return ApiService.post(`/cart`, product);
};

export const updateCartItem = (cart) => {
  return ApiService.put(`/cart/${cart._id._str}`, cart);
};

export const removeCartItem = (_id) => {
  return ApiService.delete(`/cart/${_id}`);
};

/** ORDERS */

export const addOrderItem = (order) => {
  return ApiService.post(`/orders`, order);
};