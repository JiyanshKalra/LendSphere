import apiClient from './apiClient';

const repaymentService = {
  recordRepayment: async (repaymentData) => {
    try {
      const response = await apiClient.post('/repayments', repaymentData);
      return response.data;
    } catch (error) {
      console.error('recordRepayment Service Error:', error.friendlyMessage || error.message);
      throw error;
    }
  },

  getRepaymentHistory: async (loanId) => {
    try {
      const response = await apiClient.get(`/loans/${loanId}/repayments`);
      return response.data;
    } catch (error) {
      console.error('getRepaymentHistory Service Error:', error.friendlyMessage || error.message);
      throw error;
    }
  }
};

export default repaymentService;
