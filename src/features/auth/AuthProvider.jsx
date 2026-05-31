import { createContext, useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {
  AUTH_TOKEN_COOKIE,
  AUTH_USER_STORAGE_KEY,
  COOKIE_OPTIONS,
} from '../../constants/appConstants';
import { ROUTES } from '../../constants/appConstants';
import { authService } from '../../services/auth.service';
import {
  extractAuthToken,
  extractAuthUser,
  getDefaultRedirectPath,
  normalizeAuthUser,
} from './utils/auth.utils';


export const AuthContext = createContext(null);

const isUserLike = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }

  return [
    'id',
    'name',
    'email',
    'role',
    'roles',
    'user_type',
    'role_name',
    'roleName',
    'role_id',
    'roleId',
  ].some((key) => key in value);
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

  const fallbackUser = userCandidates.find(isUserLike);

  return {
    token: extractAuthToken(data),
    user: extractAuthUser(data) || (fallbackUser ? normalizeAuthUser(fallbackUser) : null),
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

const getStoredUser = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(AUTH_USER_STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue);
    return isUserLike(parsedValue) ? normalizeAuthUser(parsedValue) : null;
  } catch {
    return null;
  }
};

const storeUser = (user) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    if (!user) {
      window.localStorage.removeItem(AUTH_USER_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(normalizeAuthUser(user)));
  } catch {
    // Ignore storage failures and keep auth state in memory.
  }
};

const mergeUserData = (storedUser, freshUser) => {
  if (!freshUser) {
    return null;
  }

  const normalizedFreshUser = normalizeAuthUser(freshUser);

  if (!storedUser) {
    return normalizedFreshUser;
  }

  const hasFreshRole = Object.prototype.hasOwnProperty.call(normalizedFreshUser, 'role');
  const hasFreshRoles = Object.prototype.hasOwnProperty.call(normalizedFreshUser, 'roles');

  return {
    ...storedUser,
    ...normalizedFreshUser,
    ...(hasFreshRole ? {} : { role: storedUser.role }),
    ...(hasFreshRoles ? {} : { roles: storedUser.roles }),
  };
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearSession = useCallback(() => {
    Cookies.remove(AUTH_TOKEN_COOKIE, COOKIE_OPTIONS);
    storeUser(null);
    setUser(null);
    setLoading(false);
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const response = await authService.me();
      const { user: currentUser } = getAuthPayload(response.data);
      const nextUser = mergeUserData(getStoredUser(), currentUser);

      setUser(nextUser);
      storeUser(nextUser);

      return nextUser;
    } catch (error) {
      setUser(null);

      if (error?.response?.status === 401 || error?.response?.status === 403) {
        clearSession();
      }

      return null;
    } finally {
      setLoading(false);
    }
  }, [clearSession]);

  useEffect(() => {
    const init = async () => {
      const token = Cookies.get(AUTH_TOKEN_COOKIE);

      if (!token) {
        storeUser(null);
        setLoading(false);
        return;
      }

      await fetchUser();
    };

    init();
  }, [fetchUser]);

  useEffect(() => {
    const handleLogout = () => clearSession();
    window.addEventListener('auth:logout', handleLogout);

    return () => window.removeEventListener('auth:logout', handleLogout);
  }, [clearSession]);

  //login
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const { token, user: loginUser } = getAuthPayload(response.data);

      if (token) {
        Cookies.set(AUTH_TOKEN_COOKIE, token, COOKIE_OPTIONS);
      }

      const currentUser = loginUser || await fetchUser();
      const nextUser = mergeUserData(getStoredUser(), currentUser);

      if (!nextUser) {
        return {
          status: 'error',
          message: 'Login succeeded, but user data could not be loaded.',
        };
      }

      setUser(nextUser);
      storeUser(nextUser);

      return {
        status: 'success',
        message: 'Signed in successfully.',
        redirectTo: getDefaultRedirectPath(nextUser),
      };
    } catch (error) {
      return {
        status: 'error',
        message: getErrorMessage(error, 'Login failed.'),
        errors: getErrorFields(error),
      };
    }
  };

    //register
  const register = async (data) => {
    try {
      const response = await authService.register(data);

      return {
        status: 'success',
        message: response?.data?.message || 'Account created successfully.',
        redirectTo: "/login",
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

  const loginWithGoogle = async () => {
    throw new Error('Google sign-in is not configured yet.');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: Boolean(user),
        login,
        loginWithGoogle,
        register,
        logout,
        refreshUser: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContext;