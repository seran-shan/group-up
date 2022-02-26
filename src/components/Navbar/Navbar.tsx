import { Box } from '@mui/material';
import React from 'react';

import Avatar from '@material-ui/core/Avatar';

import NavLink from '../molecules/NavLink';

const Navbar = () => (
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
        <NavLink href="/" sx={{ marginRight: '40px' }}>
          Dashboard
        </NavLink>
        <NavLink href="/groups" sx={{ marginRight: '40px' }}>
          My Groups
        </NavLink>
        <NavLink sx={{ marginRight: '40px' }}>Match</NavLink>
        <NavLink sx={{ marginRight: '40  px' }}>Profile</NavLink>
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
      </Box>
    </Box>
  </Box>
);

export default Navbar;
