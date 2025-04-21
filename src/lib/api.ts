import axios, { AxiosInstance } from 'axios';

const BASE_URL =
  import.meta.env.MODE === 'development'
    ? '/api/omdb'
    : import.meta.env.VITE_API_BASE_URL || 'https://www.omdbapi.com/';

const API_KEY = import.meta.env.VITE_API_KEY;

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    Pragma: 'no-cache',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

api.interceptors.request.use((config) => {
  config.params = {
    apikey: API_KEY,
    ...config.params,
  };
  return config;
});
