import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../constants/apiEndpoints';
import { AUTH_TOKEN_COOKIE, COOKIE_OPTIONS } from '../constants/appConstants';
import { ROUTES } from '../constants/routes';
import { clearAuthCookies, extractAuthToken } from '../features/auth/utils/auth.utils';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Flag to prevent multiple refresh requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get(AUTH_TOKEN_COOKIE);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for handling common errors and automatic refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (Token Expired or Invalid)
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If we are already on login page, just reject
      if (window.location.pathname === ROUTES.LOGIN || originalRequest.url.includes(ROUTES.LOGIN)) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the token
        const response = await axios.post(`${API_BASE_URL}/refresh`, {}, {
          headers: { Authorization: `Bearer ${Cookies.get(AUTH_TOKEN_COOKIE)}` }
        });

        const token = extractAuthToken(response.data);

        if (!token) {
          throw new Error('Refresh response did not include a token.');
        }
        
        Cookies.set(AUTH_TOKEN_COOKIE, token, COOKIE_OPTIONS);
        
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        originalRequest.headers.Authorization = `Bearer ${token}`;
        
        processQueue(null, token);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        
        // Refresh failed, logout user
        clearAuthCookies();
        
        if (window.location.pathname !== ROUTES.LOGIN) {
          window.location.href = `${ROUTES.LOGIN}?expired=true`;
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle 403 Forbidden (Account Suspended or Unauthorized Role)
    if (error.response?.status === 403) {
      const message = error.response.data?.message || 'Access denied';
      console.error(message);
      // You might want to show a notification here
    }

    return Promise.reject(error);
  }
);

export default api;
