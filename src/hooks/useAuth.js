import { useAuth as useAuthContext } from '../context/AuthContext';

export const useAuth = () => useAuthContext();

// Role checker
export const useHasRole = (allowedRoles) => {
  const { user } = useAuth();

  if (!user?.role) return false;

  const userRoles = Array.isArray(user.role)
    ? user.role
    : [user.role];

  const roles = Array.isArray(allowedRoles)
    ? allowedRoles
    : [allowedRoles];

  return userRoles.some((role) => roles.includes(role));
};
