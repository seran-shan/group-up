import React from 'react';
import {
  Box, Container, Grid, Typography,
} from '@mui/material';
import GroupProfile from '../components/Profile/GroupProfile';
import GroupProfileDetail from '../components/Profile/GroupProfileDetail';
import Navbar from '../components/Navbar/Navbar';

const GroupProfileView = () => (
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
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Group Profile
        </Typography>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <GroupProfile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <GroupProfileDetail group={{
              description: '',
              id: '',
              users: [],
              age: '',
              contactInfo: '',
              date: '',
              name: '',
              interests: [],
              image: '',
              admin: '',
            }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default GroupProfileView;
