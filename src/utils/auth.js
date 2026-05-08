import Cookies from 'js-cookie';
import { COOKIE_OPTIONS, ROLES } from './constants';

const ROLE_ID_MAP = {
  1: ROLES.ADMIN,
  2: ROLES.CUSTOMER,
};

const ROLE_NAME_MAP = {
  admin: ROLES.ADMIN,
  manager: ROLES.MANAGER,
  staff: ROLES.STAFF,
  customer: ROLES.CUSTOMER,
  user: ROLES.CUSTOMER,
};

const normalizeRoleValue = (value) => {
  if (typeof value === 'number') {
    return ROLE_ID_MAP[value] ?? null;
  }

  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim().toLowerCase();

  return ROLE_NAME_MAP[normalized] ?? null;
};

export const clearAuthCookies = () => {
  Cookies.remove('token', COOKIE_OPTIONS);
  Cookies.remove('user', COOKIE_OPTIONS);
  Cookies.remove('token');
  Cookies.remove('user');
};

export const extractAuthToken = (payload) => (
  payload?.token ??
  payload?.access_token ??
  payload?.data?.token ??
  payload?.data?.access_token ??
  null
);

export const extractRoleName = (source) => {
  if (!source) {
    return null;
  }

  if (typeof source === 'string' || typeof source === 'number') {
    return normalizeRoleValue(source);
  }

  if (Array.isArray(source)) {
    return source.map(extractRoleName).find(Boolean) ?? null;
  }

  if (typeof source === 'object') {
    const directRole = source.role ?? source.roles ?? source.user_type;

    if (directRole && directRole !== source) {
      const nestedRole = extractRoleName(directRole);

      if (nestedRole) {
        return nestedRole;
      }
    }

    const mappedRoleId = normalizeRoleValue(source.role_id ?? source.roleId);

    if (mappedRoleId) {
      return mappedRoleId;
    }

    for (const key of ['slug', 'title', 'code', 'name']) {
      if (typeof source[key] === 'string') {
        const normalizedRole = normalizeRoleValue(source[key]);

        if (normalizedRole) {
          return normalizedRole;
        }
      }
    }
  }

  return null;
};

export const normalizeAuthUser = (user) => {
  if (!user || typeof user !== 'object' || Array.isArray(user)) {
    return user;
  }

  const normalizedRole = extractRoleName(user);

  if (!normalizedRole) {
    return user;
  }

  return {
    ...user,
    role: normalizedRole,
  };
};

export const extractAuthUser = (payload) => {
  const nestedUser = payload?.user ?? payload?.data?.user;

  if (nestedUser && typeof nestedUser === 'object' && !Array.isArray(nestedUser)) {
    return normalizeAuthUser(nestedUser);
  }

  const directUser = payload?.data;

  if (
    directUser &&
    typeof directUser === 'object' &&
    !Array.isArray(directUser) &&
    ('id' in directUser || 'email' in directUser || 'role' in directUser)
  ) {
    return normalizeAuthUser(directUser);
  }

  return null;
};

export const getApiErrorMessage = (error, fallback = 'Something went wrong.') => {
  const validationErrors = error?.response?.data?.errors;

  if (validationErrors && typeof validationErrors === 'object') {
    const firstError = Object.values(validationErrors).flat().find(Boolean);

    if (firstError) {
      return firstError;
    }
  }

  const status = error?.response?.status;

  if (status === 401) {
    return error?.response?.data?.message || 'Invalid email or password.';
  }

  if (status === 403) {
    return error?.response?.data?.message || 'You do not have permission to continue.';
  }

  if (status >= 500) {
    return fallback;
  }

  return error?.response?.data?.message || error?.message || fallback;
};

export const getHomePathForRole = (role) => {
  const normalizedRole = extractRoleName(role);

  if ([ROLES.ADMIN,ROLES.STAFF].includes(normalizedRole)) {
    return '/admin/dashboard';
  }

  return '/customer';
};

export const getUserRoles = (user) => {
  const roleValues = [
    user?.role,
    user?.role?.name,
    ...(Array.isArray(user?.roles) ? user.roles : []),
  ];

  return roleValues
    .filter(Boolean)
    .flatMap((role) => {
      if (typeof role === 'string' || typeof role === 'number') {
        const normalized = extractRoleName(role);
        return normalized ? [normalized] : [String(role).toLowerCase()];
      }

      if (typeof role === 'object' && role !== null) {
        return [role.name, role.role, role.slug]
          .filter(Boolean)
          .map((value) => extractRoleName(value) || String(value).toLowerCase());
      }

      return [];
    });
};

export const isAdminUser = (user) => {
  const roles = getUserRoles(user);
  return roles.some((role) => [ROLES.ADMIN, ROLES.MANAGER, ROLES.STAFF].includes(role));
};

export const isCustomerUser = (user) => getUserRoles(user).includes(ROLES.CUSTOMER);

export const getDefaultRedirectPath = (user) => {
  if (isAdminUser(user)) {
    return '/dashboard';
  }

  if (isCustomerUser(user)) {
    return '/';
  }

  return '/';
};
