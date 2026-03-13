import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { user, loading, activeRole } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-[#174E4F]" size={64} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is logged in but hasn't picked a role for the session, redirect to role selection.
  // Exceptions: the select-role page itself and the onboarding pages
  const onboardingPaths = ['/select-role', '/complete-borrower-profile', '/complete-lender-profile'];
  if (!activeRole && !onboardingPaths.includes(location.pathname)) {
    return <Navigate to="/select-role" replace />;
  }

  return children;
};

export default ProtectedRoute;
