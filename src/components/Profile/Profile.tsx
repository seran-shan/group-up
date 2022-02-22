import { Button } from '@mui/material';
import React from 'react';
import { useAuth } from '../../provider/AuthProvider';

const Profile = () => {
  const { user, signout } = useAuth();

  const handleLogout = async () => {
    await signout();
  };
  return (
    <div>
      <p>Profile</p>
      <p>{user?.email}</p>
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
};

export default Profile;
