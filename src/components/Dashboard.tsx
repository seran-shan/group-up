import { Button } from '@mui/material';
import React from 'react';
import { useAuth } from '../provider/AuthProvider';

const Dashboard = () => {
  const { user, signout } = useAuth();

  const handleLogout = async () => {
    await signout();
  };
  return (
    <div>
      <p>Dashboard</p>
      <p>{user?.email}</p>
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
};

export default Dashboard;
