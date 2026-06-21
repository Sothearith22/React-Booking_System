import apiClient from '../../../services/apiClient';

const unwrap = (response) => response.data?.data ?? response.data;

export const roomService = {
  async getById(id) {
    const response = await apiClient.get(`/v1/rooms/${id}`);
    return unwrap(response);
  },

  async createBooking(payload) {
    const response = await apiClient.post(`/v1/bookings`, payload);
    return unwrap(response);
  },
};
