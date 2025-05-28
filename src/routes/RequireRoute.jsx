import { useContext } from 'react';
import { AuthContext } from '@/providers/authContext';
import { Navigate } from 'react-router-dom';

export default function RequireRole({ allowedRoles, children }) {
  const { user, isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return null;

  if (!isAuthenticated || !allowedRoles.includes(user?.role)) {
    return <Navigate to="/landing" replace />;
  }

  return children;
}
