import { Box } from '@mui/material';
import React from 'react';

import Avatar from '@mui/material/Avatar';

import Button from '@mui/material/Button';
import NavLink from '../molecules/NavLink';
import { useAuth } from '../../provider/AuthProvider';

const Navbar = () => {
  const { signout, user } = useAuth();

  const handleLogout = () => {
    signout();
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr',
          alignItems: 'center',
          width: '100%',
          height: '88px',
          backgroundColor: '#F9F9F9',
          boxShadow: '5px 5px 5px #ACACAC',
        }}
      >
        <Box sx={{ marginLeft: '40px' }}>
          {' '}
          <img src="logo512.png" alt="GroupUp Logo" width={60} height={60} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginRight: '100px',
            marginLeft: '100px',
            minWidth: '400px',
          }}
        >
          {/* <NavLink href="/" sx={{ marginRight: '40px' }}>
          Dashboard
        </NavLink> */}
          <NavLink href="/myGroups" sx={{ marginRight: '40px' }}>
            My Groups
          </NavLink>
          <NavLink href="/superlikes" sx={{ marginRight: '40px' }}>
            My superlikes
          </NavLink>
          <NavLink href="/" sx={{ marginRight: '40px' }}>
            Match
          </NavLink>
          <NavLink href="/profile" sx={{ marginRight: '40  px' }}>
            Profile
          </NavLink>
          {user?.uid === 'ObrQl9DSMHRBJkaQ4ikFom9OlA02' ? (
            <NavLink href="/admin" sx={{ marginRight: '40  px' }}>
              Admin
            </NavLink>
          ) : (
            <Box />
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            marginRight: '150px',
          }}
        >
          <NavLink>
            {' '}
            <Avatar />
          </NavLink>
          <Box sx={{ width: '100px', height: '20px' }}>
            <Button variant="contained" onClick={handleLogout}>
              Log out
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
