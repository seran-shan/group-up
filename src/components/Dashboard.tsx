import React from 'react';
import { useAuth } from '../provider/AuthProvider';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <p>Dashboard</p>
      <p>{user?.email}</p>
    </div>
  );
};

export default Dashboard;
