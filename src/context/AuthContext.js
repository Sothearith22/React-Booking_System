import { createContext, createElement, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { authService } from '../services/api';
import { getDefaultRedirectPath } from '../utils/auth';
import { COOKIE_OPTIONS } from '../utils/constants';

const USER_STORAGE_KEY = 'react-booking-user';

const clearStoredAuth = () => {
  localStorage.removeItem(USER_STORAGE_KEY);
  Cookies.remove('token');
};

const parseStoredUser = (value) => {
  if (!value || value === 'undefined' || value === 'null') {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    console.error('Failed to parse stored auth user:', error);
    return null;
  }
};

const getAuthPayload = (responseData) => {
  const token = responseData?.token
    || responseData?.access_token
    || responseData?.accessToken
    || responseData?.data?.token
    || responseData?.data?.access_token
    || responseData?.data?.accessToken;

  const user = responseData?.user
    || responseData?.data?.user
    || responseData?.data?.data?.user
    || responseData?.data?.account
    || responseData?.account;

  return { token, user };
};

const persistAuthSession = ({ user, token }) => {
  Cookies.set('token', token, COOKIE_OPTIONS);
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

const getErrorMessage = (error, fallbackMessage) => {
  const data = error?.response?.data;

  if (!data) {
    return fallbackMessage;
  }

  if (data.errors && typeof data.errors === 'object') {
    const firstError = Object.values(data.errors)
      .flat()
      .find((value) => typeof value === 'string' && value.trim());

    if (firstError) {
      return firstError;
    }
  }

  if (typeof data.message === 'string' && data.message.trim()) {
    return data.message;
  }

  return fallbackMessage;
};

const getErrorFields = (error) => {
  const data = error?.response?.data;

  if (data?.errors && typeof data.errors === 'object') {
    return Object.fromEntries(
      Object.entries(data.errors).map(([key, value]) => [
        key,
        Array.isArray(value) ? value[0] : value,
      ])
    );
  }

  return {};
};

const defaultAuthContext = {
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => ({ status: 'error' }),
  register: async () => ({ status: 'error' }),
  logout: () => {},
};

const AuthContext = createContext(defaultAuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    const token = Cookies.get('token');

    if (savedUser && token) {
      const parsedUser = parseStoredUser(savedUser);

      if (parsedUser) {
        setUser(parsedUser);
      } else {
        clearStoredAuth();
      }
    } else {
      // Clear up if inconsistent
      clearStoredAuth();
    }
    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    try {
      const response = await authService.login({ email, password });
      let { user: userData, token } = getAuthPayload(response.data);

      if (!token) {
        return {
          status: 'error',
          message: 'Login response is missing token data.',
        };
      }

      if (!userData) {
        Cookies.set('token', token, COOKIE_OPTIONS);

        try {
          const meResponse = await authService.me();
          ({ user: userData } = getAuthPayload(meResponse.data));
        } catch (meError) {
          console.error('Failed to fetch current user after login:', meError);
        }
      }

      if (!userData) {
        clearStoredAuth();
        return {
          status: 'error',
          message: 'Login succeeded, but user data could not be loaded.',
        };
      }

      persistAuthSession({ user: userData, token });
      setUser(userData);

      return {
        status: 'success',
        message: 'Signed in successfully.',
        user: userData,
        redirectTo: getDefaultRedirectPath(userData),
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        status: 'error',
        message: getErrorMessage(error, 'Email or password is incorrect.'),
      };
    }
  };

  const register = async (values) => {
    try {
      const response = await authService.register(values);
      let { user: userData, token } = getAuthPayload(response.data);

      if (token && !userData) {
        Cookies.set('token', token, COOKIE_OPTIONS);

        try {
          const meResponse = await authService.me();
          ({ user: userData } = getAuthPayload(meResponse.data));
        } catch (meError) {
          console.error('Failed to fetch current user after registration:', meError);
        }
      }

      if (!userData) {
        userData = response.data?.user
          || response.data?.data
          || response.data?.account
          || null;
      }

      if (!userData) {
        clearStoredAuth();
        return {
          status: 'error',
          message: response.data?.message || 'Registration completed successfully. Please sign in.',
        };
      }

      clearStoredAuth();
      setUser(null);

      return {
        status: 'success',
        message: 'Account created successfully.',
        user: userData,
        redirectTo: '/login',
      };
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Registration error payload:', error?.response?.data);
      return {
        status: 'error',
        message: getErrorMessage(error, 'Registration failed. Please try again.'),
        errors: getErrorFields(error),
      };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      clearStoredAuth();
    }
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    loading,
    login,
    register,
    logout,
  };

  return createElement(AuthContext.Provider, { value }, children);
}

export default AuthContext;
