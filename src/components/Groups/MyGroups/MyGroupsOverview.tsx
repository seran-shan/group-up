import Box from '@mui/material/Box';

import React, { useState, useEffect } from 'react';

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
  return (
    <Box sx={{ flexGrow: 2 }}>
      <Navbar />
      <Box>Your groups!</Box>
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
            contactInfo={group.contactInfo}
            users={group.users}
            interests={group.interests}
          />
        ))}
      </Box>
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
            contactInfo={group.contactInfo}
            users={group.users}
            interests={group.interests}
          />
        ))}
      </Box>
    </Box>
  );
}
