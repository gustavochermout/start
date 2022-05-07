import axios from "axios";
import { getToken, getUserId } from './auth';

const api = axios.create({
  baseURL: process.env.API_BASE_URL
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
    config.headers.user_id = getUserId();
  }
  return config;
});

export default api;