import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const { toast } = useToast();

  if (!isAuthenticated) {
    toast({
      title: 'Access Denied',
      description: 'You must be logged in to access this page',
      variant: 'destructive',
    });
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    toast({
      title: 'Admin Access Only',
      description: 'You must be an admin to access this page',
      variant: 'destructive',
    });
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;