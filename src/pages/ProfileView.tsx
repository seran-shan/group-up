import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import Profile from '../components/Profile/Profile';
import ProfileDetail from '../components/Profile/ProfileDetail';
import Navbar from '../components/Navbar/Navbar';

const ProfileView = () => (
  <>
    <Navbar />
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={16} md={16} xs={16}>
            <ProfileDetail />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default ProfileView;
