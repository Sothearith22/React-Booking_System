import Cookies from 'js-cookie';
import {
  AUTH_TOKEN_COOKIE,
  AUTH_USER_STORAGE_KEY,
  COOKIE_OPTIONS,
  ROLES,
} from '../../../constants/appConstants';
import { ROUTES } from '../../../constants/routes';

const ROLE_ID_MAP = {
  1: ROLES.ADMIN,
  2: ROLES.CUSTOMER,
};

export const DASHBOARD_HOME_PATH = ROUTES.ADMIN_DASHBOARD;
export const CUSTOMER_HOME_PATH = ROUTES.CUSTOMER;
export const CUSTOMER_PROFILE_PATH = ROUTES.CUSTOMER_PROFILE;
export const ADMIN_WORKSPACE_ROLES = [ROLES.ADMIN, ROLES.MANAGER, ROLES.STAFF];

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
  Cookies.remove(AUTH_TOKEN_COOKIE, COOKIE_OPTIONS);
  Cookies.remove(AUTH_TOKEN_COOKIE);

  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(AUTH_USER_STORAGE_KEY);
  }
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
    const directRole =
      source.role ??
      source.roles ??
      source.user_type ??
      source.role_name ??
      source.roleName;

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

const isDirectUserPayload = (payload) => (
  payload &&
  typeof payload === 'object' &&
  !Array.isArray(payload) &&
  (
    'id' in payload ||
    'email' in payload ||
    'role' in payload ||
    'roles' in payload ||
    'user_type' in payload ||
    'role_name' in payload ||
    'roleName' in payload ||
    'role_id' in payload ||
    'roleId' in payload
  )
);

export const extractAuthUser = (payload) => {
  const nestedUser = payload?.user ?? payload?.data?.user;

  if (isDirectUserPayload(nestedUser)) {
    return normalizeAuthUser(nestedUser);
  }

  const directUser = payload?.data;

  if (isDirectUserPayload(directUser)) {
    return normalizeAuthUser(directUser);
  }

  if (isDirectUserPayload(payload)) {
    return normalizeAuthUser(payload);
  }

  return null;
};

export const getHomePathForRole = (role) => {
  const normalizedRole = extractRoleName(role);

  if (ADMIN_WORKSPACE_ROLES.includes(normalizedRole)) {
    return DASHBOARD_HOME_PATH;
  }

  return CUSTOMER_HOME_PATH;
};

export const getUserRoles = (user) => {
  const roleValues = [
    user?.role,
    user?.role?.name,
    user?.roles,
    user?.user_type,
    user?.role_name,
    user?.roleName,
    user?.role_id,
    user?.roleId,
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
  return roles.some((role) => ADMIN_WORKSPACE_ROLES.includes(role));
};

export const isCustomerUser = (user) => getUserRoles(user).includes(ROLES.CUSTOMER);

export const getDefaultRedirectPath = (user) => {
  if (isAdminUser(user)) {
    return DASHBOARD_HOME_PATH;
  }

  if (isCustomerUser(user)) {
    return CUSTOMER_HOME_PATH;
  }

  return CUSTOMER_HOME_PATH;
};
