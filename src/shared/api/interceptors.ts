import axios from 'axios';
import { catchError } from '../helpers/catch-error';
import {
  getAccessToken,
  removeTokenFromStorage,
} from '../services/auth/auth-token.service';
import { authService } from '../services/auth/auth.service';

export const options = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const baseAxios = axios.create(options);

const authAxios = axios.create(options);

authAxios.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

authAxios.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      (error?.response?.status === 401 ||
        catchError(error) === 'jwt expired' ||
        catchError(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await authService.getNewTokens();
        return authAxios.request(originalRequest);
      } catch (error) {
        if (catchError(error as Error) === 'jwt expired')
          removeTokenFromStorage();
      }
    }
    throw error;
  },
);

export { authAxios, baseAxios };
