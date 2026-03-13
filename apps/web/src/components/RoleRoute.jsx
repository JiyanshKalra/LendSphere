import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const RoleRoute = ({ allowedRoles, children }) => {
  const { user, activeRole } = useAuth();
  const { addToast } = useToast();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(activeRole)) {
    // Show a toast on next render (via effect), redirect now
    setTimeout(() => {
      addToast({
        type: 'error',
        title: 'Access Denied',
        message: 'You do not have permission to access that page.'
      });
    }, 0);
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleRoute;
