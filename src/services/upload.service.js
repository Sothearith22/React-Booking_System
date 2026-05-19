import apiClient from './apiClient';

export const uploadService = {
  upload(url, formData, config = {}) {
    return apiClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    });
  },
};
