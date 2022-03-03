import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import { Box, Button, Modal, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAuth } from '../../provider/AuthProvider';
import { getGroupByID, createGroups } from '../../services/Firebase';

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
  contactInfo: string;
  users: string[];
  interests: string[];
  id: string;
}

const GroupCard: FC<GroupCardProps> = ({
  name,
  date,
  description,
  contactInfo,
  users,
  interests,
  id,
}) => {
  const [openJoin, setOpenJoin] = React.useState(false);
  const handleOpenJoin = () => setOpenJoin(true);
  const handleCloseJoin = () => setOpenJoin(false);

  const [openMatch, setOpenMatch] = React.useState(false);
  const handleOpenMatch = () => setOpenMatch(true);
  const handleCloseMatch = () => setOpenMatch(false);

  const { user } = useAuth();

  // doesn't work
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
        groupData.interests,
        groupData.users,
        groupData.admin,
        groupData.id
      );
      console.log('sucess');
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const handleNav = () => {
    navigate(`/groups/${id}`);
  };

  return (
    <Card sx={{ width: '350px', marginBottom: '100px' }}>
      <CardHeader title={name} sx={{ pt: 3 }} />
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

      <p>{users.length + 1} members</p>
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
              <Typography id="match" variant="h6" component="h2">
                Contact information: {contactInfo}
              </Typography>
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </Card>
  );
};

export default GroupCard;
