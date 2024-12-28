import axios from 'axios';
import { getUserLocalStorage } from '../../../utils';

const url = `${
  process.env['NX_PUBLIC_BACK_PURE_TV_URL'] ?? 'http://localhost:3000'
}/api-pure-tv`;
export const pureTvApi = axios.create({
  baseURL: url,
});

pureTvApi.interceptors.request.use(
  (config) => {
    const user = getUserLocalStorage();
    config.headers.Authorization = user?.token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
