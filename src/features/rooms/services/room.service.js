import { API_ENDPOINTS } from '../../../constants/apiEndpoints';
import { uploadService } from '../../../services/upload.service';
import apiClient from '../../../services/apiClient';

const unwrapResponse = (response) => response.data?.data ?? response.data;

export const roomService = {
  async getRooms(params = {}) {
    const response = await apiClient.get(API_ENDPOINTS.rooms.list, { params });
    return unwrapResponse(response);
  },

  async getRoom(id) {
    const response = await apiClient.get(API_ENDPOINTS.rooms.detail(id));
    return unwrapResponse(response);
  },

  async addRoom(payload) {
    const response = await apiClient.post(API_ENDPOINTS.rooms.list, payload);
    return unwrapResponse(response);
  },

  async updateRoom(id, payload) {
    const response = await apiClient.patch(API_ENDPOINTS.rooms.detail(id), payload);
    return unwrapResponse(response);
  },

  async deleteRoom(id) {
    const response = await apiClient.delete(API_ENDPOINTS.rooms.detail(id));
    return unwrapResponse(response);
  },

  async getServices() {
    const response = await apiClient.get(API_ENDPOINTS.services.list);
    return unwrapResponse(response);
  },

  async uploadRoomImage(roomId, file, sortOrder = 1) {
    const formData = new FormData();
    formData.append('room_id', String(roomId));
    formData.append('image', file);
    formData.append('sort_order', String(sortOrder));

    const response = await uploadService.upload(API_ENDPOINTS.uploads.roomImage, formData);

    return unwrapResponse(response);
  },

  async uploadRoomImages(roomId, files = []) {
    const imageFiles = files.filter((file) => file instanceof File);

    return Promise.all(
      imageFiles.map((file, index) => this.uploadRoomImage(roomId, file, index + 1))
    );
  },
};
