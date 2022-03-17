import Box from '@mui/material/Box';

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import { getMemberGroups, getAdminGroups } from '../../../services/Firebase';

import { Group } from '../../../types/group';
import Navbar from '../../Navbar/Navbar';
import GroupCard from '../GroupCard';
import { useAuth } from '../../../provider/AuthProvider';

export default function GroupsOverview() {
  const { user } = useAuth();
  const [memberGroups, setMemberGroups] = useState<Group[]>();
  const [adminGroups, setAdminGroups] = useState<Group[]>();

  const getGroup = async () => {
    if (user === null || user.email === null) {
      return;
    }
    await getMemberGroups(user.email).then((data) => {
      setMemberGroups(data);
    });
    await getAdminGroups(user.uid).then((data) => {
      setAdminGroups(data);
    });
  };

  useEffect(() => {
    getGroup();
  }, []);

  const navigate = useNavigate();

  const handleNav = () => {
    navigate('/createGroup');
  };

  return (
    <Box sx={{ flexGrow: 2 }}>
      <Navbar />
      <Box sx={{ width: '100%', height: '200px' }}>
        <h1>Experience new things with friends </h1>
        <Button
          onClick={handleNav}
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: '#125A2E',
            '&:hover': { backgroundColor: '#16913A' },
          }}
        >
          Create new group
        </Button>
      </Box>
      <Box
        sx={{
          maxWidth: '80%',
          display: 'flex',
          flexDirection: 'row',
          margin: 'auto',
          justifyContent: 'space-evenly',
        }}
      >
        <Box sx={{}}>
          <p>Groups that you are an admin of</p>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              maxWidth: '1000px',
              margin: 'auto',
              marginTop: '40px',
            }}
          >
            {adminGroups?.map((group: Group) => (
              <GroupCard
                name={group.name}
                description={group.description}
                date={group.date}
                id={group.id}
                users={group.users}
                interests={group.interests}
                admin={group.admin}
                location={group.location}
              />
            ))}
          </Box>
        </Box>
        <Box>
          <p>Groups that you are a member of:</p>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              maxWidth: '1000px',
              margin: 'auto',
              marginTop: '40px',
            }}
          >
            {memberGroups?.map((group: Group) => (
              <GroupCard
                name={group.name}
                description={group.description}
                date={group.date}
                id={group.id}
                users={group.users}
                interests={group.interests}
                admin={group.admin}
                location={group.location}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
