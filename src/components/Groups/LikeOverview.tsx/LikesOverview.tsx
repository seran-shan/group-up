import Box from '@mui/material/Box';

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { InputLabel, Modal, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { getGroupsSuperliking, getMatches, getMemberGroups } from '../../../services/Firebase';

import { Group } from '../../../types/group';
import Navbar from '../../Navbar/Navbar';
import GroupCard from '../GroupCard';
import { useAuth } from '../../../provider/AuthProvider';

const style = {
  position: 'absolute' as 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #008000',
  boxShadow: 24,
  p: 4,
};

export default function LikesOverview() {
  const { user } = useAuth();
  const [superlikedGroups, setSuperlikedGroups] = useState<Group[]>();

  const [openSuperlike, setOpenSuperlike] = React.useState(false);
  const handleOpenSuperlike = () => setOpenSuperlike(true);
  const handleCloseSuperlike = () => setOpenSuperlike(false);

  const [likedGroups, setLikedGroups] = useState<Group[]>();

  const [openLike, setOpenLike] = React.useState(false);
  const handleOpenLike = () => setOpenLike(true);
  const handleCloseLike = () => setOpenLike(false);

  const [memberGroups, setMemberGroups] = useState<Group[]>();

  const getMemGroups = async () => {
    if (user === null || user.email === null) {
      return;
    }
    await getMemberGroups(user.email).then((data) => {
      setMemberGroups(data);
    });
  };

  const displaySuperlikeGroups = async () => {
    await getGroupsSuperliking(group).then((data) => {
      setSuperlikedGroups(data);
      console.log(superlikedGroups);
    });
  };

  const displayMatches = async () => {
    await getMatches(group).then((data) => {
      setLikedGroups(data);
      console.log(likedGroups);
    });
  };

  const handleSuperlike = () => {
    displaySuperlikeGroups();
  };

  const handleLike = () => {
    displayMatches();
  };

  useEffect(() => {
    getMemGroups();
  }, []);

  const [group, setGroup] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setGroup(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 2 }}>
      <Navbar />
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
          <p>Groups that have superliked your group: </p>

          <Grid container justifyContent="center" spacing={1} sx={{ pb: 5 }}>

            <Button
              onClick={handleOpenSuperlike}
              variant="contained"
              size="small"
              style={{ background: '#33792F' }}
            >
              Choose group
            </Button>

            <Modal
              disableEnforceFocus
              open={openSuperlike}
              onClose={handleCloseSuperlike}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Which of your groups do you want to view superlikes for?
                </Typography>

                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Group</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={group}
                      label="Age"
                      onChange={handleChange}
                    >
                      {memberGroups?.map((memberGroup: Group) => (
                        <MenuItem
                          value={memberGroup.id}
                        >
                          {memberGroup.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Button
                  onClick={() => {
                    handleSuperlike();
                    handleCloseSuperlike();
                  }}
                  variant="outlined"
                  color="primary"
                >
                  View superlikes
                </Button>
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
            {superlikedGroups?.map((memberGroup: Group) => (
              <GroupCard
                name={memberGroup.name}
                description={memberGroup.description}
                date={memberGroup.date}
                id={memberGroup.id}
                users={memberGroup.users}
                interests={memberGroup.interests}
                admin={memberGroup.admin}
                superlikedGroups={memberGroup.superlikedGroups}
                likedGroups={memberGroup.likedGroups}
              />
            ))}
          </Box>
        </Box>

        <Box>
          <p>Groups that have liked/ matched with your group: </p>

          <Grid container justifyContent="center" spacing={1} sx={{ pb: 5 }}>

            <Button
              onClick={handleOpenLike}
              variant="contained"
              size="small"
              style={{ background: '#33792F' }}
            >
              Choose group
            </Button>

            <Modal
              disableEnforceFocus
              open={openLike}
              onClose={handleCloseLike}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Which of your groups do you want to view likes/matches for?
                </Typography>

                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Group</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={group}
                      label="Age"
                      onChange={handleChange}
                    >
                      {memberGroups?.map((memberGroup: Group) => (
                        <MenuItem
                          value={memberGroup.id}
                        >
                          {memberGroup.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Button
                  onClick={() => {
                    handleLike();
                    handleCloseLike();
                  }}
                  variant="outlined"
                  color="primary"
                >
                  View likes
                </Button>
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
            {likedGroups?.map((memberGroup: Group) => (
              <GroupCard
                name={memberGroup.name}
                description={memberGroup.description}
                date={memberGroup.date}
                id={memberGroup.id}
                users={memberGroup.users}
                interests={memberGroup.interests}
                admin={memberGroup.admin}
                superlikedGroups={memberGroup.superlikedGroups}
                likedGroups={memberGroup.likedGroups}
              />
            ))}
          </Box>
        </Box>

      </Box>
    </Box>
  );
}
