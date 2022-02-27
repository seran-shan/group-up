import Box from '@mui/material/Box';

import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';

import { getAllGroups } from '../../../services/Firebase';

import { Group } from '../../../types/group';
import Navbar from '../../Navbar/Navbar';
import GroupCard from '../GroupCard';

export default function GroupsOverview() {
  const [groups, setGroups] = useState<Group[]>();

  const getGroup = async () => {
    await getAllGroups().then((data) => {
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
          maxWidth: '1000px',
          margin: 'auto',
        }}
      >
        <Box sx={{ dispaly: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
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
    </Box>
  );
}
