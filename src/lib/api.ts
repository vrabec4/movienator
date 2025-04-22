import axios, { AxiosInstance } from 'axios';

const BASE_URL = '/api/omdb';

const API_KEY = import.meta.env.VITE_API_KEY || '';

if (import.meta.env.DEV && !API_KEY) {
  console.warn('WARNING: OMDB API key is missing! Set VITE_API_KEY in .env file.');
}

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
  if (import.meta.env.DEV) {
    config.params = {
      apikey: API_KEY,
      ...config.params,
    };
  }
  return config;
});
