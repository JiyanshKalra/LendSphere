import apiClient from './apiClient';

const loanService = {
  getLoans: async (params = {}) => {
    try {
      const response = await apiClient.get('/loans', { params });
      return response.data;
    } catch (error) {
      console.error('getLoans Service Error:', error.friendlyMessage || error.message);
      throw error;
    }
  },

  getLoanById: async (id) => {
    try {
      const response = await apiClient.get(`/loans/${id}`);
      return response.data;
    } catch (error) {
      console.error('getLoanById Service Error:', error.friendlyMessage || error.message);
      throw error;
    }
  },

  createLoan: async (loanData) => {
    try {
      const response = await apiClient.post('/loans', loanData);
      return response.data;
    } catch (error) {
      console.error('createLoan Service Error:', error.friendlyMessage || error.message);
      throw error;
    }
  },

  openLoanForOffers: async (id) => {
    try {
      const response = await apiClient.patch(`/loans/${id}/open`);
      return response.data;
    } catch (error) {
      console.error('openLoanForOffers Service Error:', error.friendlyMessage || error.message);
      throw error;
    }
  },

  fundLoan: async (id) => {
    try {
      const response = await apiClient.patch(`/loans/${id}/fund`);
      return response.data;
    } catch (error) {
      console.error('fundLoan Service Error:', error.friendlyMessage || error.message);
      throw error;
    }
  }
};

export default loanService;
