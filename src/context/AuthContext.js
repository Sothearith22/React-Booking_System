import { createContext, createElement, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { authService } from '../services/api';
import { COOKIE_OPTIONS } from '../utils/constants';
import { getDefaultRedirectPath } from '../utils/auth';

const AuthContext = createContext();

const isUserLike = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }

  return ['id', 'name', 'email', 'role', 'roles'].some((key) => key in value);
};

const getAuthPayload = (data) => {
  const userCandidates = [
    data?.user,
    data?.account,
    data?.data?.user,
    data?.data?.account,
    data?.data,
    data,
  ];

  return {
    token:
      data?.token ||
      data?.access_token ||
      data?.accessToken ||
      data?.data?.token ||
      data?.data?.access_token ||
      data?.data?.accessToken ||
      null,
    user: userCandidates.find(isUserLike) || null,
  };
};

const getErrorMessage = (error, fallbackMessage) => {
  const responseData = error?.response?.data;

  if (typeof responseData?.message === 'string' && responseData.message.trim()) {
    return responseData.message;
  }

  const firstFieldError = Object.values(responseData?.errors || {})
    .flat()
    .find((value) => typeof value === 'string' && value.trim());

  return firstFieldError || fallbackMessage;
};

const getErrorFields = (error) => {
  const responseErrors = error?.response?.data?.errors;

  if (!responseErrors || typeof responseErrors !== 'object') {
    return {};
  }

  return Object.fromEntries(
    Object.entries(responseErrors).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value,
    ])
  );
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearSession = () => {
    Cookies.remove('token');
    setUser(null);
    setLoading(false);
  };

  // ✅ Load user from API (source of truth)
  const fetchUser = async () => {
    try {
      const res = await authService.me();
      const { user } = getAuthPayload(res.data);
      setUser(user);
      return user;
    } catch (error) {
      setUser(null);

      if (error?.response?.status === 401 || error?.response?.status === 403) {
        clearSession();
      }

      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      const token = Cookies.get('token');

      if (!token) {
        setLoading(false);
        return;
      }

      await fetchUser();
    };

    init();
  }, []);

  // 🔥 Listen logout from axios
  useEffect(() => {
    const handleLogout = () => clearSession();
    window.addEventListener('auth:logout', handleLogout);

    return () => window.removeEventListener('auth:logout', handleLogout);
  }, []);

  //  Login
  const login = async (credentials) => {
    try {
      const res = await authService.login(credentials);
      const { token, user: loginUser } = getAuthPayload(res.data);

      if (token) {
        Cookies.set('token', token, COOKIE_OPTIONS);
      }

      const currentUser = loginUser || await fetchUser();

      if (!currentUser) {
        return {
          status: 'error',
          message: 'Login succeeded, but user data could not be loaded.',
        };
      }

      setUser(currentUser);

      return {
        status: 'success',
        message: 'Signed in successfully.',
        redirectTo: getDefaultRedirectPath(currentUser),
      };
    } catch (error) {
      return {
        status: 'error',
        message: getErrorMessage(error, 'Login failed.'),
        errors: getErrorFields(error),
      };
    }
  };

  // Register
  const register = async (data) => {
    try {
      const response = await authService.register(data);

      return {
        status: 'success',
        message: response?.data?.message || 'Account created successfully.',
        redirectTo: '/login',
      };
    } catch (error) {
      return {
        status: 'error',
        message: getErrorMessage(error, 'Register failed.'),
        errors: getErrorFields(error),
      };
    }
  };


  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }

    clearSession();
  };

  return createElement(
    AuthContext.Provider,
    {
      value: {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      },
    },
    children
  );
};

// Hook
export const useAuth = () => useContext(AuthContext);
