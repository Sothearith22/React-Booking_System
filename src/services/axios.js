import axios from 'axios';
import Cookies from 'js-cookie';
import { COOKIE_OPTIONS } from '../utils/constants';
import { config } from '../utils/config';

const TOKEN_COOKIE = 'token';
const AUTH_BYPASS_PATHS = ['/login', '/refresh', '/register', '/logout'];

const api = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Refresh control
let isRefreshing = false;
let failedQueue = [];

const shouldBypassRefresh = (requestConfig) => {
  const url = requestConfig?.url || '';

  return AUTH_BYPASS_PATHS.some((path) => url.includes(path));
};

// Process queued requests
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

//  Attach token to every request
api.interceptors.request.use(
  requestConfig => {
    const token = Cookies.get(TOKEN_COOKIE);
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }

    return requestConfig;
  },
  error => Promise.reject(error)
);

// refresh token
api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (
      !originalRequest ||
      error.response?.status !== 401 ||
      originalRequest._retry ||
      shouldBypassRefresh(originalRequest) ||
      !Cookies.get(TOKEN_COOKIE)
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(token => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const res = await api.post('/refresh');
      const token =
        res.data?.token ||
        res.data?.access_token ||
        res.data?.accessToken ||
        null;

      if (!token) {
        throw new Error('Refresh response did not include a token.');
      }

      Cookies.set(TOKEN_COOKIE, token, COOKIE_OPTIONS);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      originalRequest.headers.Authorization = `Bearer ${token}`;

      processQueue(null, token);
      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);

      Cookies.remove(TOKEN_COOKIE);
      delete api.defaults.headers.common.Authorization;

      //  Trigger global logout event
      window.dispatchEvent(new Event('auth:logout'));

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
