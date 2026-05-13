import api from './axios';

export const roomService = {
  getRooms: () =>
    api.get('/v1/rooms').then((response) => ({...response,
      data: response.data?.data ?? response.data ?? [],})),
  addRoom: (data) => api.post('/v1/rooms', data),
  updateRoom: (id, data) => api.put(`/v1/rooms/${id}`, data),
  deleteRoom: (id) => api.delete(`/v1/rooms/${id}`),
};

export default roomService;
