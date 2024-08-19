import axios from 'axios';
import Cookies from 'js-cookie';

const backendApiTimeout = 60000;

const baseURL = 'https://us-central1-mediappv-936c2.cloudfunctions.net/api/';
// const baseURL = 'http://127.0.0.1:5001/mediappv-936c2/us-central1/api/';
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
  async (error) => {
    const errorResponse = error?.response?.data?.error;

    if (errorResponse) {
      return Promise.reject({ ...errorResponse });
    } else {
      return Promise.reject({
        code: 'UNHANDLED_ERROR',
        category: 'UNKNOWN_ERROR',
      });
    }
  }
);
axiosInstance.interceptors.request.use(
  (config) => {
    const sessionToken = Cookies.get('MEDIAPPV_SESSION_TOKEN');
    console.log({ sessionToken });
    if (sessionToken) {
      config.headers['Cookie'] = `MEDIAPPV_SESSION_TOKEN=${sessionToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
