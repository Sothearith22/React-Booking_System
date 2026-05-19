import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
};

export const useHasRole = (allowedRoles) => {
  const { user } = useAuth();

  if (!user?.role) {
    return false;
  }

  const userRoles = Array.isArray(user.role) ? user.role : [user.role];
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  return userRoles.some((role) => roles.includes(role));
};
