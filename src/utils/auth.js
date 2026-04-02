export const getUserRoles = (user) => {
  const roleValues = [
    user?.role,
    user?.role?.name,
    ...(Array.isArray(user?.roles) ? user.roles : []),
  ];

  return roleValues
    .filter(Boolean)
    .map((role) => String(role).toLowerCase());
};

export const isAdminUser = (user) => getUserRoles(user).includes('admin');

export const isCustomerUser = (user) => getUserRoles(user).includes('customer');

export const getDefaultRedirectPath = (user) => {
  if (isAdminUser(user)) {
    return '/dashboard';
  }

  if (isCustomerUser(user)) {
    return '/';
  }

  return '/';
};
