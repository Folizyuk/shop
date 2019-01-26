import ApiService from './ApiService';

export const createProduct = (product) => {
  return ApiService.post(`/products`, product);
};

export const updateProduct = (product) => {
  return ApiService.put(`/products/${product._id._str}`, product);
};

export const deleteProduct = (id) => {
  return ApiService.delete(`/products/${id}`);
};