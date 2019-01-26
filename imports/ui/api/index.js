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
  return ApiService.post(`/users/login`, user);
};