import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useLoggedUser } from '../../contexts';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { loggedUser } = useLoggedUser();

  return loggedUser?.id ? children : <Navigate to="/login" />;
};
