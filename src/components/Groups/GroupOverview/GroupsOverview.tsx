import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';

import { getAllGroups } from '../../../services/Firebase';

import { Group } from '../../../types/group';
import Navbar from '../../Navbar/Navbar';
import GroupCard from '../GroupCard';

export default function GroupsOverview() {
  const [groups, setGroups] = useState<Group[]>();

  const getGroup = async () => {
    await getAllGroups().then((data) => {
      setGroups(data);
    });
  };

  useEffect(() => {
    getGroup();
  }, []);


  return (
    <Box sx={{ flexGrow: 2 }}>
      <Navbar />

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
        {groups?.map((group: Group) => (
          <GroupCard
            name={group.name}
            description={group.description}
            date={group.date}
            id={group.id}
            contactInfo={group.contactInfo}
            users={group.users}
            interests={group.interests}
          />
        ))}
      </Box>
    </Box>
  );
}
