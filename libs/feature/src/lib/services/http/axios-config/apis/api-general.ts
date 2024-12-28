/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { getUserLocalStorage } from '../../../utils';

const url = `${
  process.env['NX_PUBLIC_BACK_GENERAL_URL'] ?? 'http://localhost:3000'
}/api-general`;
export const generalApi = axios.create({
  baseURL: url,
});

generalApi.interceptors.request.use(
  (config) => {
    const user = getUserLocalStorage();
    config.headers.Authorization = user?.token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
