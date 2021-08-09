import apiRequest from 'utils/apiRequest';

const DoctorService = {
  getAllDoctors: () =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiRequest.get('/doctor');
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),

  getDoctorById: (doctorId) =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiRequest.get(`/doctor/${doctorId}`);
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),

  addDoctor: (doctorData) =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiRequest.post(`/doctor`, doctorData);
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),

  updateDoctor: (doctorId, doctorData) =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiRequest.put(
          `/doctor/${doctorId}`,
          doctorData
        );
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),

  deleteDoctor: (doctorId) =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiRequest.delete(`/doctor/${doctorId}`);
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),
};

export default DoctorService;
