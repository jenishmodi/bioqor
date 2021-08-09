import apiRequest from 'utils/apiRequest';

const DistributorService = {
  getAllDistributors: () =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiRequest.get('/distributor');
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),

  getDistributorById: (distributorId) =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiRequest.get(`/distributor/${distributorId}`);
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),

  addDistributor: (distributorData) =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiRequest.post(`/distributor`, distributorData);
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),

  updateDistributor: (distributorId, distributorData) =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiRequest.put(
          `/distributor/${distributorId}`,
          distributorData
        );
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),

  deleteDistributor: (distributorId) =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiRequest.delete(
          `/distributor/${distributorId}`
        );
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),
};

export default DistributorService;
