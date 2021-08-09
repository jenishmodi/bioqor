import apiRequest from 'utils/apiRequest';
import { objectToFormData } from 'utils/helpers';

const SalesService = {
  getAllSaless: () =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiRequest.get('/sales');
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),

  getSalesById: (salesId) =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiRequest.get(`/sales/${salesId}`);
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),

  addSales: (salesData) =>
    new Promise(async (resolve, reject) => {
      try {
        const formData = objectToFormData(salesData);
        const { data } = await apiRequest.post(`/sales`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),

  updateSales: (salesId, salesData) =>
    new Promise(async (resolve, reject) => {
      try {
        const formData = objectToFormData(salesData);
        const { data } = await apiRequest.put(`/sales/${salesId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),

  deleteSales: (salesId) =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiRequest.delete(`/sales/${salesId}`);
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),
};

export default SalesService;
