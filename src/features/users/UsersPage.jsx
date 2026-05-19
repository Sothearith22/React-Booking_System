import React, { useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Loader2,
  Search,
  Trash2,
  UserPlus,
  Users,
} from 'lucide-react';

import Alert from '../../components/ui/Alert';
import Button from '../../components/ui/Button';
import DeleteConfirmationModal from '../../components/ui/DeleteConfirmationModal';
import Modal from '../../components/ui/Modal';
import { useUsers } from './hooks/useUsers';

const ROWS_PER_PAGE = 5;
const DEFAULT_NEW_USER = {
  name: '',
  email: '',
  role: 'staff',
};

const ROLE_ORDER = ['admin', 'manager', 'receptionist', 'staff', 'customer'];
const CREATE_ROLE_ORDER = ['staff', 'receptionist', 'manager', 'admin'];

const ROLE_CONFIG = {
  admin: {
    label: 'Admin',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
  },
  manager: {
    label: 'Manager',
    bg: 'bg-violet-50',
    text: 'text-violet-700',
  },
  receptionist: {
    label: 'Receptionist',
    bg: 'bg-sky-50',
    text: 'text-sky-700',
  },
  staff: {
    label: 'Staff',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
  },
  customer: {
    label: 'Customer',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
  },
};

const STATUS_CONFIG = {
  active: {
    label: 'Active',
    dot: 'bg-emerald-500',
    text: 'text-emerald-700',
  },
  inactive: {
    label: 'Inactive',
    dot: 'bg-gray-400',
    text: 'text-gray-500',
  },
  pending: {
    label: 'Pending',
    dot: 'bg-amber-500',
    text: 'text-amber-700',
  },
};

const StatCard = ({ label, value, subtitle, subtitleColor }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{label}</p>
    <div className="flex items-end justify-between gap-3">
      <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
      {subtitle ? (
        <span className={`text-xs font-semibold text-right ${subtitleColor || 'text-gray-400'}`}>{subtitle}</span>
      ) : null}
    </div>
  </div>
);

const UsersPage = () => {
  const {
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
  } = useUsers();

  const [successMessage, setSuccessMessage] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [newUser, setNewUser] = useState(DEFAULT_NEW_USER);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ROWS_PER_PAGE));
  const activePage = Math.min(currentPage, totalPages);
  const pagedUsers = useMemo(
    () => filteredUsers.slice((activePage - 1) * ROWS_PER_PAGE, activePage * ROWS_PER_PAGE),
    [activePage, filteredUsers]
  );

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewUser(DEFAULT_NEW_USER);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setRoleFilter('all');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  const handleAddUser = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);

    try {
      await createUser({
        name: newUser.name.trim(),
        email: newUser.email.trim(),
        role: newUser.role,
        status: 'pending',
      });

      setSuccessMessage('User created successfully.');
      closeAddModal();
      setCurrentPage(1);
    } catch (submitError) {
      console.error(submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) {
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage(null);

    try {
      await deleteUser(userToDelete);
      setSuccessMessage('User removed successfully.');
      setUserToDelete(null);
      setCurrentPage((page) => Math.max(1, Math.min(page, totalPages)));
    } catch (deleteError) {
      console.error(deleteError);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
        <p className="text-gray-500 font-medium">Loading users…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">User Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">Create, edit and manage staff accounts and permissions.</p>
        </div>
        <Button className="flex items-center gap-2 shadow-lg shadow-blue-500/20" onClick={() => setIsAddModalOpen(true)}>
          <UserPlus size={18} /> Add New User
        </Button>
      </div>

      {error ? (
        <Alert type="error">
          {error}
        </Alert>
      ) : null}

      {successMessage ? (
        <Alert type="success" onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      ) : null}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, email, role or department…"
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={roleFilter}
            onChange={(event) => {
              setRoleFilter(event.target.value);
              setCurrentPage(1);
            }}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="all">All Roles</option>
            {ROLE_ORDER.map((role) => (
              <option key={role} value={role}>
                {ROLE_CONFIG[role].label}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setCurrentPage(1);
            }}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>

          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={resetFilters}
          >
            <Filter size={14} /> Reset Filters
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">User</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Role</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Department</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last Login</th>
                <th className="px-6 py-4 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {pagedUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <Users size={48} className="mx-auto text-gray-200 mb-4" />
                    <h3 className="text-base font-bold text-gray-900">No users found</h3>
                    <p className="text-sm text-gray-500 mt-1">Try adjusting your filters.</p>
                  </td>
                </tr>
              ) : (
                pagedUsers.map((user) => {
                  const roleConfig = ROLE_CONFIG[user.role] || ROLE_CONFIG.staff;
                  const statusConfig = STATUS_CONFIG[user.status] || STATUS_CONFIG.active;

                  return (
                    <tr key={user.id} className="group hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                            {user.initials}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${roleConfig.bg} ${roleConfig.text}`}>
                          {roleConfig.label}
                        </span>
                      </td>

                    

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${statusConfig.text}`}>
                          <span className={`w-2 h-2 rounded-full ${statusConfig.dot}`} />
                          {statusConfig.label}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 italic">
                        {user.last_login}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          type="button"
                          onClick={() => setUserToDelete(user)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {filteredUsers.length > ROWS_PER_PAGE ? (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Showing <span className="font-bold text-gray-900">{(activePage - 1) * ROWS_PER_PAGE + 1} to {Math.min(activePage * ROWS_PER_PAGE, filteredUsers.length)}</span> of <span className="font-bold text-gray-900">{filteredUsers.length}</span> users
            </p>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={activePage === 1}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${page === activePage ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={activePage === totalPages}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={stats.total} subtitle="+2 this month" subtitleColor="text-emerald-600" />
        <StatCard label="Active Now" value={stats.active} />
        <StatCard label="Admin Roles" value={stats.admins} />
        <StatCard label="Pending Invites" value={stats.pending} subtitle={stats.pending > 0 ? 'Expiring soon' : ''} subtitleColor="text-amber-600" />
      </div>

      <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title="Add New User">
        <form onSubmit={handleAddUser} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Full Name</label>
            <input
              required
              value={newUser.name}
              onChange={(event) => setNewUser((previous) => ({ ...previous, name: event.target.value }))}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="e.g. Sarah Miller"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Email</label>
            <input
              required
              type="email"
              value={newUser.email}
              onChange={(event) => setNewUser((previous) => ({ ...previous, email: event.target.value }))}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="e.g. sarah@luxstay.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Role</label>
              <select
                value={newUser.role}
                onChange={(event) => setNewUser((previous) => ({ ...previous, role: event.target.value }))}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                {CREATE_ROLE_ORDER.map((role) => (
                  <option key={role} value={role}>
                    {ROLE_CONFIG[role].label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1 flex items-center justify-center gap-2" disabled={isSubmitting}>
              <UserPlus size={16} /> {isSubmitting ? 'Creating...' : 'Create User'}
            </Button>
            <Button type="button" variant="ghost" className="flex-1" onClick={closeAddModal} disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      <DeleteConfirmationModal
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Remove User?"
        message="Are you sure you want to revoke access and remove this user account?"
        itemName={userToDelete?.name}
      />
    </div>
  );
};

export default UsersPage;
