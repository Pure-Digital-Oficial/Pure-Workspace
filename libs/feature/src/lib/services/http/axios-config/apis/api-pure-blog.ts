import axios from 'axios';
import { getUserLocalStorage } from '../../../utils';

const url = `${
  process.env['NX_PUBLIC_BACK_PURE_BLOG_URL'] ?? 'http://localhost:3000'
}/api-pure-blog`;
export const pureBlogApi = axios.create({
  baseURL: url,
});

pureBlogApi.interceptors.request.use(
  (config) => {
    const user = getUserLocalStorage();
    config.headers.Authorization = user?.token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
