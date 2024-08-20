import axios from 'axios';

const backendApiTimeout = 60000;

const baseURL = 'https://api.mediappv.tech';
// const baseURL = 'https://api.mediappv.tech:3003'; // for local
const axiosInstance = axios.create({
  timeout: backendApiTimeout,
  baseURL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: any) => {
    const errorResponse = error?.response?.data?.error;
    if (errorResponse) {
      return Promise.reject({ ...errorResponse });
    }
    return Promise.reject({
      code: 'UNHANDLED_ERROR',
      category: 'UNKNOWN_ERROR',
    });
  }
);
axiosInstance.interceptors.request.use(
  (response) => response,
  (error) => {
    const errorResponse = error?.response?.data?.error;
    return Promise.reject({ ...errorResponse });
  }
);

export default axiosInstance;
