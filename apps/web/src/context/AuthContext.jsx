import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [activeRole, setActiveRoleState] = useState(() => localStorage.getItem('activeRole'));
  const [loading, setLoading] = useState(true);
  const { clearToasts } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const setActiveRole = async (role) => {
    clearToasts();
    
    if (role && user) {
      try {
        setLoading(true);
        // Sync role change with backend which returns a new token
        const updatedUser = await authService.switchRole(user.id || user._id, role);
        setUser(updatedUser);
      } catch (err) {
        console.error('Failed to sync role switch with backend', err);
      } finally {
        setLoading(false);
      }
    }

    setActiveRoleState(role);
    if (role) {
      localStorage.setItem('activeRole', role);
    } else {
      localStorage.removeItem('activeRole');
    }
  };

  const login = async (credentials) => {
    clearToasts();
    const data = await authService.login(credentials);
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setActiveRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, activeRole, setActiveRole, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
