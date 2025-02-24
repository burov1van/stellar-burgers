import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../services/store';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuth ? children : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
