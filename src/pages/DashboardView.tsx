import Box from '@mui/material/Box';
import React from 'react';
import Dashboard from '../components/Dashboard';
import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/Navbar/SideBar';

const DashboardView = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      width: '100%',
      height: '100%',
    }}
  >
    <Navbar />
    <Dashboard />
  </Box>
);

export default DashboardView;
