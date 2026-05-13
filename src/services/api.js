import api from './axios';

export const authService = {
  register: (data) => api.post('/register', data),
  login: (credentials) => api.post('/login', credentials),
  me: () => api.get('/me'),
  refresh: () => api.post('/refresh'),
  logout: () => api.post('/logout'),
};

export const adminService = {
  getUsers: () => api.get('/admin/users'),
  createUser: (data) => api.post('/admin/users', data),
  getUser: (id) => api.get(`/admin/users/${id}`),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),

  // getRooms: () =>
  //   api.get('/v1/rooms').then((response) => ({
  //     ...response,
  //     data: response.data?.data ?? response.data ?? [],
  //   })),
  // addRoom: (data) => api.post('/v1/rooms', data),
  // updateRoom: (id, data) => api.put(`/v1/rooms/${id}`, data),
  // deleteRoom: (id) => api.delete(`/v1/rooms/${id}`),

  // getBookings: () =>
  //   api.get('/v1/bookings').then((response) => ({
  //     ...response,
  //     data: response.data?.data ?? response.data ?? [],
  //   })),
  // updateBookingStatus: (id, status) => api.put(`/v1/bookings/${id}`, { status }),

  // getCategories: () => api.get('/admin/categories'),
  // createCategory: (data) => api.post('/admin/categories', data),
  // updateCategory: (id, data) => api.put(`/admin/categories/${id}`, data),
  // deleteCategory: (id) => api.delete(`/admin/categories/${id}`),
};

export default {
  auth: authService,
  admin: adminService,
};
