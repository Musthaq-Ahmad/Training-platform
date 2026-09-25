// src/api/client.ts
import axios from 'axios';
import { toApiError } from './errors';

export const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true, // send the login cookie
  timeout: 15000,
});

// Runs on every failed request
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = toApiError(error);

    // Session expired → back to the login page
    if (apiError.status === 401 && window.location.pathname !== '/login') {
      window.location.href = '/login';
    }

    return Promise.reject(apiError);
  }
);
