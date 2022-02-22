import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../provider/AuthProvider';

const NoUserRoute = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default NoUserRoute;
