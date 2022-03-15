import { Button, Grid, Modal, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../provider/AuthProvider';

import { getAllGroups } from '../../../services/Firebase';

import { Group } from '../../../types/group';
import Navbar from '../../Navbar/Navbar';
import GroupCard from '../GroupCard';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function GroupsOverview() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          !group.users.includes(user?.email)
          && !(group.admin === user?.uid)
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
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          maxWidth: '1000px',
          margin: 'auto',
          marginTop: '40px',
        }}>
        <Button onClick={handleOpen}
          variant="contained"
          size="small"
          style={{ background: '#33792F' }}
        >Filter groups</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Filter groups
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              attributes you can filter
            </Typography>
          </Box>
        </Modal>
      </Grid>
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
            users={group.users}
            interests={group.interests}
            admin={group.admin}
          />
        ))}
      </Box>
    </Box>
  );
}
