import apiRequest from 'utils/apiRequest';

const EmployeeService = {
  getAllEmployees: () =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiRequest.get('/employee');
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),

  getEmployeeById: (employeeId) =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiRequest.get(`/employee/${employeeId}`);
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),

  addEmployee: (employeeData) =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiRequest.post(`/employee`, employeeData);
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),

  updateEmployee: (employeeId, employeeData) =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiRequest.put(
          `/employee/${employeeId}`,
          employeeData
        );
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),

  deleteEmployee: (employeeId) =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await apiRequest.delete(`/employee/${employeeId}`);
        !data.status ? reject(data.message) : resolve(data);
      } catch (error) {
        reject(error);
      }
    }),
};

export default EmployeeService;
