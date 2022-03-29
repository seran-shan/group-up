import Box from '@mui/material/Box';

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import { getMemberGroups } from '../../../services/Firebase';

import { Group } from '../../../types/group';
import Navbar from '../../Navbar/Navbar';
import MyGroupCard from '../MyGroupCard';
import { useAuth } from '../../../provider/AuthProvider';

export default function GroupsOverview() {
  const { user } = useAuth();
  const [memberGroups, setMemberGroups] = useState<Group[]>();

  const getGroup = async () => {
    if (user === null || user.email === null) {
      return;
    }
    await getMemberGroups(user.email).then((data) => {
      setMemberGroups(data);
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
        <Box>
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
              <MyGroupCard
                name={group.name}
                description={group.description}
                date={group.date}
                id={group.id}
                users={group.users}
                interests={group.interests}
                admin={group.admin}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
