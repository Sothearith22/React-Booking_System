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
        return [String(role).toLowerCase()];
      }

      if (typeof role === 'object' && role !== null) {
        return [
          role.name,
          role.role,
          role.slug,
        ]
          .filter(Boolean)
          .map((value) => String(value).toLowerCase());
      }

      return [];
    });
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
