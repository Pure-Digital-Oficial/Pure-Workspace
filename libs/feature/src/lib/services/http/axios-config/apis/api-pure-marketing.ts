import axios from 'axios';
import { getUserLocalStorage } from '../../../utils';

const url = `${
  process.env['NX_PUBLIC_BACK_PURE_MARKETING_URL'] ?? 'http://localhost:3000'
}/api-pure-marketing`;
export const pureMaketingApi = axios.create({
  baseURL: url,
});

pureMaketingApi.interceptors.request.use(
  (config) => {
    const user = getUserLocalStorage();
    config.headers.Authorization = user?.token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
