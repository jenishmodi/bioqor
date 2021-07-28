import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
});

axiosInstance.interceptors.request.use((req) => {
  if (req.url.includes('/login') || req.url.includes('/signup')) {
    return req;
  }
  // req.headers['Authorization'] = `Bearer ${getAuthTokenFromStorage()}`;
  return req;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      // removeAuthTokenFromStorage();
      window.location.reload();
    }
    return err;
  }
);

const apiRequest = {
  get: (url, config = {}) => axiosInstance.get(url, config),
  post: (url, data, config = {}) => axiosInstance.post(url, data, config),
  put: (url, data, config = {}) => axiosInstance.put(url, data, config),
  delete: (url, config = {}) => axiosInstance.delete(url, config),
};

export default apiRequest;
