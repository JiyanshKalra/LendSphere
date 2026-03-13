import apiClient from './apiClient';

const profileService = {
  getProfile: async (userId) => {
    try {
      const response = await apiClient.get(`/profile/${userId}`);
      return response.data;
    } catch (error) {
      console.error('getProfile Service Error:', error.friendlyMessage || error.message);
      throw error;
    }
  },

  updateProfile: async (userId, data) => {
    try {
      const response = await apiClient.put(`/profile/${userId}`, data);
      return response.data;
    } catch (error) {
      console.error('updateProfile Service Error:', error.friendlyMessage || error.message);
      throw error;
    }
  }
};

export default profileService;
