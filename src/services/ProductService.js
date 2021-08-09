import apiRequest from 'utils/apiRequest';
import { objectToFormData } from 'utils/helpers';

const ProductService = {
  getAllProducts: () =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiRequest.get('/product');
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),

  getProductById: (productId) =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiRequest.get(`/product/${productId}`);
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),

  addProduct: (productData) =>
    new Promise(async (resolve, reject) => {
      try {
        const formData = objectToFormData(productData);
        const { data } = await apiRequest.post(`/product`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),

  updateProduct: (productId, productData) =>
    new Promise(async (resolve, reject) => {
      try {
        const formData = objectToFormData(productData);
        const { data } = await apiRequest.put(
          `/product/${productId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),

  deleteProduct: (productId) =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiRequest.delete(`/product/${productId}`);
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),
};

export default ProductService;
