import React, { FC, useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import GroupProfile from '../components/Profile/GroupProfile';
import GroupProfileDetail from '../components/Profile/GroupProfileDetail';
import Navbar from '../components/Navbar/Navbar';
import { Group } from '../types/group';
import group from 'material-ui/svg-icons/social/group';
import { useParams } from 'react-router-dom';
import { getGroupByID } from '../services/Firebase';
import { Groups } from '@mui/icons-material';

const GroupProfileView = () => {
  const { id } = useParams();
  const [group, setGroup] = useState<Group>();

  const getGroup = async () => {
    if (id == null) {
      console.log('hello');
      return;
    }
    const groupNow = await getGroupByID(id);
    setGroup(groupNow);
  };

  useEffect(() => {
    console.log('try');
    getGroup();
  }, []);

  return (
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
          <Typography sx={{ mb: 3 }} variant="h4">
            Group Profile
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <GroupProfile />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <GroupProfileDetail
                description={group?.description}
                name={group?.name}
                users={group?.users}
                admin={group?.admin}
                interests={group?.interests}
                age={group?.age}
                date={group?.date}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default GroupProfileView;
