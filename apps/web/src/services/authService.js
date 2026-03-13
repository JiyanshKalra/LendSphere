import apiClient from './apiClient';

const authService = {
  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('role', response.data.user.role || '');
        }
      }
      return response.data;
    } catch (error) {
      console.error('Registration Service Error:', error.friendlyMessage || error.message);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('role', response.data.user.role || '');
        }
      }
      return response.data;
    } catch (error) {
      console.error('Login Service Error:', error.friendlyMessage || error.message);
      throw error;
    }
  },

  switchRole: async (userId, newRole) => {
    try {
      const response = await apiClient.put(`/users/${userId}/role`, { role: newRole });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('role', response.data.role || '');
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  submitOnboarding: async (userId, onboardingData) => {
    try {
      const response = await apiClient.put(`/users/${userId}/onboarding`, onboardingData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('activeRole');
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  getCurrentUser: () => {
    // Try to get from localStorage first for faster access
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error('Error parsing stored user', e);
      }
    }

    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      // Simple JWT payload decode (assuming it's a standard JWT)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const user = JSON.parse(jsonPayload);
      // Backfill localStorage if missing
      localStorage.setItem('user', JSON.stringify(user));
      if (user.role) localStorage.setItem('role', user.role);
      return user;
    } catch (e) {
      console.error('Error decoding token', e);
      return null;
    }
  }
};

export default authService;
