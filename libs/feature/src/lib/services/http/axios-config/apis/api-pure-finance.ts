import axios from 'axios';
import { getUserLocalStorage } from '../../../utils';

const url = `${
  process.env['NX_PUBLIC_BACK_FINANCE_URL'] ?? 'http://localhost:3000'
}/api-pure-finance`;
export const pureFinanceApi = axios.create({
  baseURL: url,
});

pureFinanceApi.interceptors.request.use(
  (config) => {
    const user = getUserLocalStorage();
    config.headers.Authorization = user?.token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
