import { useCallback, useEffect, useMemo, useState } from 'react';
import { extractRoleName } from '../../auth/utils/auth.utils';
import { userService } from '../services/user.service';

const ADMIN_ROLES = new Set(['admin', 'manager']);

const getUserList = (payload) => {
  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.users)) {
    return payload.users;
  }

  if (Array.isArray(payload)) {
    return payload;
  }

  return [];
};

const formatLastLogin = (value) => {
  if (!value) {
    return 'Never';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const getInitials = (name = '', email = '') => {
  const label = name.trim() || email.trim();

  if (!label) {
    return 'NA';
  }

  const parts = label.split(/\s+/).filter(Boolean);

  if (parts.length > 1) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return label.slice(0, 2).toUpperCase();
};

const normalizeUser = (user) => {
  const role = extractRoleName(user) || 'staff';
  const status = String(user?.status || 'active').toLowerCase();

  return {
    id: user?.id ?? crypto.randomUUID(),
    name: user?.name || 'Unknown user',
    email: user?.email || 'No email',
    role,
    status,
    department: user?.department || 'Operations',
    last_login: formatLastLogin(user?.last_login ?? user?.lastLogin ?? user?.updated_at),
    initials: getInitials(user?.name, user?.email),
  };
};

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const nextUsers = (await userService.getAll()).map(normalizeUser);
      setUsers(nextUsers);
    } catch (loadError) {
      setUsers([]);
      setError(loadError?.response?.data?.message || 'Unable to load users right now.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredUsers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch = !query || [
        user.name,
        user.email,
        user.role,
        user.department,
      ].some((value) => String(value).toLowerCase().includes(query));

      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [roleFilter, searchTerm, statusFilter, users]);

  const stats = useMemo(() => ({
    total: users.length,
    active: users.filter((user) => user.status === 'active').length,
    admins: users.filter((user) => ADMIN_ROLES.has(user.role)).length,
    pending: users.filter((user) => user.status === 'pending').length,
  }), [users]);

  const createUser = useCallback(async (payload) => {
    const createdUser = normalizeUser(await userService.create(payload));

    setUsers((current) => [createdUser, ...current]);

    return createdUser;
  }, []);

  const deleteUser = useCallback(async (target) => {
    const targetId = typeof target === 'object' ? target?.id : target;

    await userService.remove(targetId);
    setUsers((current) => current.filter((user) => user.id !== targetId));
  }, []);

  return {
    loading,
    error,
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    stats,
    filteredUsers,
    createUser,
    deleteUser,
    refreshUsers: loadUsers,
  };
};
