import Box from '@mui/material/Box';
import React from 'react';
import Dashboard from '../components/Dashboard';
import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/Navbar/SideBar';

const DashboardView = () => (
  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
    <SideBar />
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        widht: '100%',
        height: '100%',
      }}
    >
      <Navbar />
      <Dashboard />
    </Box>
  </Box>
);

export default DashboardView;
