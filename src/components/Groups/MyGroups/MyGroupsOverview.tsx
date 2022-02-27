import Box from '@mui/material/Box';

import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';

import { getAllGroups, getYourGroups } from '../../../services/Firebase';

import { Group } from '../../../types/group';
import Navbar from '../../Navbar/Navbar';
import GroupCard from '../GroupCard';
import { useAuth } from '../../../provider/AuthProvider';

export default function GroupsOverview() {
  const { user } = useAuth();
  const [groups, setGroups] = useState<Group[]>();

  const getGroup = async () => {
    console.log(user?.email);
    await getYourGroups(user?.uid, user?.email).then((data) => {
      console.log(data);
      setGroups(data);
    });
  };

  useEffect(() => {
    getGroup();
  }, []);
  return (
    <Box sx={{ flexGrow: 2 }}>
      <Navbar />
      <Button onClick={getGroup}>print</Button>

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
        {groups?.map((group: Group) => {
          return (
            <GroupCard
              name={group.name}
              description={group.description}
              date={group.date}
              id={group.id}
              users={group.users}
              interests={group.interests}
            />
          );
        })}
      </Box>
    </Box>
  );
}
