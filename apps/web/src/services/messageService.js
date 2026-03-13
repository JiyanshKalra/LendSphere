import apiClient from './apiClient';

const messageService = {
  sendMessage: async (messageData) => {
    try {
      const response = await apiClient.post('/messages', messageData);
      return response.data;
    } catch (error) {
      console.error('sendMessage Service Error:', error.friendlyMessage || error.message);
      throw error;
    }
  },

  getLoanMessages: async (loanId) => {
    try {
      const response = await apiClient.get(`/loans/${loanId}/messages`);
      return response.data;
    } catch (error) {
      console.error('getLoanMessages Service Error:', error.friendlyMessage || error.message);
      throw error;
    }
  }
};

export default messageService;
