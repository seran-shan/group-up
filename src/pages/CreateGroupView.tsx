import React from 'react';
import { Box } from '@mui/material';
import CreateGroup from '../components/CreateGroups/CreateGroup';
import Navbar from '../components/Navbar/Navbar';

const CreateGroupView = () => (
  <Box>
    <Navbar />
    <CreateGroup />
  </Box>
);

export default CreateGroupView;
