import { AxiosError } from 'axios';

export type ApiError = {
  timestamp: string;
  status: 401;
  message: string;
  path: string;
};

export type APIErrorResponse<T = ApiError> = AxiosError<T>;
export type Optional<T> = T | null;

export * from './movies';
