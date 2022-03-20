import React, { FC, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import {
  Box, Button, IconButton, Modal, Typography
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarIcon from '@mui/icons-material/Star';

import { InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import {
  getGroupByID,
  createGroups,
  getUserByID,
  getMemberGroups,
  addSuperlikes
} from '../../services/Firebase';

import { useAuth } from '../../provider/AuthProvider';
import { User } from '../../types/profile';
import { Group } from '../../types/group';

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

interface GroupCardProps {
  name: string;
  date: string;
  description: string;
  users: string[];
  interests: string[];
  id: string;
  admin: string;
  superlikedGroups: string[];
}

const GroupCard: FC<GroupCardProps> = ({
  name,
  date,
  description,
  users,
  interests,
  id,
  admin,
  superlikedGroups
}) => {
  const [openJoin, setOpenJoin] = React.useState(false);
  const handleOpenJoin = () => setOpenJoin(true);
  const handleCloseJoin = () => setOpenJoin(false);

  const [openMatch, setOpenMatch] = React.useState(false);
  const handleOpenMatch = () => {
    setOpenMatch(true);
  };
  const handleCloseMatch = () => setOpenMatch(false);

  // superlikes
  const [openSuperlike, setOpenSuperlike] = React.useState(false);
  const handleOpenSuperlike = () => setOpenSuperlike(true);
  const handleCloseSuperlike = () => setOpenSuperlike(false);

  const [group, setGroup] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setGroup(event.target.value);
  };

  const { user } = useAuth();

  const handleAddMember = async () => {
    const groupData = await getGroupByID(id);
    if (groupData == null || user == null) {
      return;
    }

    const email = user.email;
    if (email == null) {
      return;
    }
    groupData.users.push(email);
    try {
      await createGroups(
        groupData.name,
        groupData.description,
        groupData.date,
        groupData.age,
        groupData.membershipType,
        groupData.interests,
        groupData.users,
        groupData.admin,
        groupData.id,
        groupData.location
      );
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const handleNav = () => {
    navigate(`/groups/${id}`);
  };

  const [adminUser2, setAdminUser] = useState<string | null>();

  const getAdmin = async () => {
    const adminUser = await getUserByID(admin);
    if (adminUser == null) {
      return;
    }

    const theUser = adminUser as unknown as User;
    setAdminUser(theUser?.email);
  };

  useEffect(() => {
    getAdmin();
    getMemGroups();
  }, []);

  const [memberGroups, setMemberGroups] = useState<Group[]>();

  const getMemGroups = async () => {
    if (user === null || user.email === null) {
      return;
    }
    await getMemberGroups(user.email).then((data) => {
      setMemberGroups(data);
      console.log(memberGroups);
    });
  };

  const handleSuperlikes = async () => {
    await addSuperlikes(group, id);
    console.log(superlikedGroups);
  };

  return (

    <Card sx={{ width: '350px', marginBottom: '100px' }}>
      <CardHeader title={name} sx={{ pt: 3 }} />

      <Grid container justifyContent="center" spacing={1} sx={{ pb: 1 }}>
        <IconButton
          onClick={handleOpenSuperlike}
          aria-label="superlike"
          color="primary"
          size="medium"
        >
          <StarIcon />
        </IconButton>

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
              Choose the group you want to superlike on behalf of:
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
                handleSuperlikes();
                handleCloseSuperlike();
              }}
              variant="outlined"
              color="primary"
            >
              Give a superlike
            </Button>

          </Box>
        </Modal>

      </Grid>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        {interests.map((interest) => (
          <Chip color="success" label={interest} />
        ))}
      </Stack>

      <p>{description}</p>

      <p>
        {users.length + 1}
        {' '}
        members
      </p>
      <p>{date}</p>

      <Grid container justifyContent="center" spacing={2} sx={{ pb: 3 }}>
        <Grid item xs="auto" sm="auto" md="auto" justifyContent="space-around">
          <Button
            onClick={() => {
              handleOpenJoin();
              handleAddMember();
            }}
            variant="contained"
            startIcon={<AddIcon />}
            size="small"
            style={{ background: '#CDEBC7' }}
          >
            Join group
          </Button>
          <Modal
            open={openJoin}
            onClose={handleCloseJoin}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="join" variant="h6" component="h2">
                You have been added to this group.
              </Typography>
            </Box>
          </Modal>
        </Grid>

        <Grid item xs="auto" sm="auto" md="auto" justifyContent="space-between">
          <Button
            onClick={handleNav}
            variant="contained"
            startIcon={<VisibilityIcon />}
            size="small"
            style={{ background: '#CDEBC7' }}
          >
            View profile
          </Button>
        </Grid>

        <Grid item xs="auto" sm="auto" md="auto" justifyContent="space-between">
          <Button
            onClick={handleOpenMatch}
            variant="contained"
            startIcon={<FavoriteBorderIcon />}
            size="small"
            style={{ background: '#CDEBC7' }}
          >
            Match
          </Button>

          <Modal
            open={openMatch}
            onClose={handleCloseMatch}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <p>
                Contact info:
                {adminUser2}
              </p>
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </Card>
  );
};

export default GroupCard;
