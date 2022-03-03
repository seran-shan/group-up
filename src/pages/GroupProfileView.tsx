import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import GroupProfileDetail from '../components/Profile/GroupProfileDetail';
import Navbar from '../components/Navbar/Navbar';
import { Group } from '../types/group';
import { getGroupByID } from '../services/Firebase';

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
            <Grid item lg={16} md={16} xs={16}>
              <GroupProfileDetail
                description={group?.description}
                name={group?.name}
                users={group?.users}
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
