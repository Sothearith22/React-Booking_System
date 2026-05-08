import { extractRoleName } from './auth';

export const getInitials = (name) => {
  if (!name) return '?';

  return name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const formatLastLogin = (value) => {
  if (!value) return 'Never';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const extractUsersList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];

  const candidates = [
    payload.data,
    payload.users,
    payload.items,
    payload.results,
    payload.records,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;
  }

  if (payload.data && typeof payload.data === 'object' && !Array.isArray(payload.data)) {
    const nestedCandidates = [
      payload.data.data,
      payload.data.users,
      payload.data.items,
      payload.data.results,
      payload.data.records,
    ];

    for (const candidate of nestedCandidates) {
      if (Array.isArray(candidate)) return candidate;
    }
  }

  return [];
};

export const extractUserRecord = (payload) => {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return null;

  const candidates = [payload.data, payload.user, payload.item, payload.result];

  for (const candidate of candidates) {
    if (candidate && typeof candidate === 'object' && !Array.isArray(candidate)) {
      return candidate;
    }
  }

  return payload;
};

const getKnownRoleName = (value) => {
  if (typeof value !== 'string') return null;

  const normalizedValue = value.trim().toLowerCase();

  return ['admin', 'manager', 'receptionist', 'staff', 'customer'].includes(normalizedValue)
    ? normalizedValue
    : null;
};

const resolveUserRole = (user) => {
  const extractedRole = extractRoleName(user);

  if (extractedRole) return extractedRole;

  const queue = [user?.role, user?.roles, user?.user_type, user?.role_name, user?.roleName];

  while (queue.length > 0) {
    const candidate = queue.shift();

    if (!candidate) continue;
    if (Array.isArray(candidate)) {
      queue.push(...candidate);
      continue;
    }

    if (typeof candidate === 'object') {
      queue.push(candidate.slug, candidate.title, candidate.code, candidate.name);
      continue;
    }

    const knownRole = getKnownRoleName(candidate);
    if (knownRole) return knownRole;
  }

  return 'staff';
};

export const normalizeUser = (user, index = 0) => {
  return {
    id: user?.id ?? user?.user_id ?? user?.userId ?? user?.uuid ?? `user-${index}`,
    apiId: user?.id ?? user?.user_id ?? user?.userId ?? user?.uuid ?? null,
    name: user?.name?.trim() || 'Unnamed User',
    email: user?.email?.trim() || 'No email',
    role: resolveUserRole(user),
    department: user?.department?.trim() || user?.team?.trim() || user?.position?.trim() || 'General',
    status:
      typeof user?.status === 'string'
        ? user.status.toLowerCase()
        : user?.is_active === false
          ? 'inactive'
          : 'active',
    initials: user?.initials || getInitials(user?.name),
    last_login: formatLastLogin(
      user?.last_login ??
      user?.lastLogin ??
      user?.last_login_at ??
      user?.lastLoginAt ??
      user?.last_seen_at ??
      user?.lastSeenAt
    ),
    raw: user,
  };
};
