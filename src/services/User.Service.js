import { adminService } from './api';

export const userService = {
  async getAll() {
    const res = await adminService.getUsers();
    return res.data;
  },

  async create(payload) {
    const res = await adminService.createUser(payload);
    return res.data;
  },
  async getUser(id){
    const res = await adminService.getUser(id)
    return res.data;
  },
  async updateUser(id){
    const res = await adminService.updateUser(id);
    return res.data;
  },

  async remove(id) {
    return adminService.deleteUser(id);
  },
};