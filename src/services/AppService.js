import apiRequest from 'utils/apiRequest';

const AppService = {
  getProducts: () =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiRequest.get('/products');
        data.error ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),
};

export default AppService;
