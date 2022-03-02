import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../provider/AuthProvider';

import { getAllGroups } from '../../../services/Firebase';

import { Group } from '../../../types/group';
import Navbar from '../../Navbar/Navbar';
import GroupCard from '../GroupCard';

export default function GroupsOverview() {
  const [groups, setGroups] = useState<Group[]>();
  const { user } = useAuth();

  const getGroup = async () => {
    const extraGroups: Group[] = [];
    await getAllGroups().then((data) => {
      data.forEach((group) => {
        if (user?.email == null) {
          return;
        }
        if (
          !group.users.includes(user?.email) &&
          !(group.admin === user?.uid)
        ) {
          extraGroups.push(group);
        }
      });
      setGroups(extraGroups);
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
