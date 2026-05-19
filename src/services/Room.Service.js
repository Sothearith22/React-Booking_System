import api from './axios';

const unwrapResponse = (response) => response.data?.data ?? response.data;

export const roomService = {
  async getRooms(params = {}) {
    const response = await api.get('/admin/rooms', { params });
    return unwrapResponse(response);
  },

  async getRoom(id) {
    const response = await api.get(`/admin/rooms/${id}`);
    return unwrapResponse(response);
  },

  async addRoom(payload) {
    const response = await api.post('/admin/rooms', payload);
    return unwrapResponse(response);
  },

  async updateRoom(id, payload) {
    const response = await api.patch(`/admin/rooms/${id}`, payload);
    return unwrapResponse(response);
  },

  async deleteRoom(id) {
    const response = await api.delete(`/admin/rooms/${id}`);
    return unwrapResponse(response);
  },

  async getServices() {
    const response = await api.get('/admin/services');
    return unwrapResponse(response);
  },

  async uploadRoomImage(roomId, file, sortOrder = 1) {
    const formData = new FormData();
    formData.append('room_id', String(roomId));
    formData.append('image', file);
    formData.append('sort_order', String(sortOrder));

    const response = await api.post('/admin/roomimage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return unwrapResponse(response);
  },

  async uploadRoomImages(roomId, files = []) {
    const imageFiles = files.filter((file) => file instanceof File);

    return Promise.all(
      imageFiles.map((file, index) => this.uploadRoomImage(roomId, file, index + 1))
    );
  },
};
