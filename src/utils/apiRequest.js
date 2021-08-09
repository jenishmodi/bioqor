import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

axiosInstance.interceptors.request.use((req) => {
  if (
    req.url.includes('/login') ||
    (req.method === 'GET' && req.url.includes('/products'))
  ) {
    return req;
  }
  req.headers['Authorization'] = localStorage.getItem('token');
  return req;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      localStorage.removeItem('token');
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
