import { Button, Checkbox, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../provider/AuthProvider';

import { getAllGroups } from '../../../services/Firebase';

import { Group } from '../../../types/group';
import FormTextField from '../../molecules/FormTextField';
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

  const [interests, setInterests] = React.useState<string[]>([]);

  const handleCheckbox = (event: SelectChangeEvent) => {
    setInterests((oldArray) => [...oldArray, event.target.value as string]);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register } = useForm();

  const [groups, setGroups] = useState<Group[]>();
  const { user } = useAuth();
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleFilter = async () => {
    const extraGroups: Group[] = [];
    await getAllGroups().then((data) => {
      data.forEach((group) => {
        if (user?.email == null) {
          return;
        }
        if (
          !group.users.includes(user?.email)
          && !(group.admin === user?.uid) && (group.age == age)
        ) {
          extraGroups.push(group);
        }
      });
      setGroups(extraGroups);
      setOpen(false);
      console.log(extraGroups);
    });
  }

  /** 
  const [size, setSize] = React.useState('');

  const handleSize = (event: SelectChangeEvent) => {
    setSize(event.target.value as unknown as number);
  };*/

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
          <Box sx={style} >
            <Typography variant="h5" component="h2" sx={{ textAlign: 'center', m: 1 }}>
              Filter groups
            </Typography>
            <Box sx={{
              textAlign: 'left', m: 1, width: '100%', display: 'flex',
              flexDirection: 'column'
            }}>
              <Stack component="form" noValidate spacing={3} />
              <Grid>
                <Typography sx={{ fontWeight: 'bold' }}>
                  Location
                </Typography>
              </Grid>
              <Typography sx={{ fontWeight: 'bold' }}>
                Agelimit
              </Typography>
              <Grid item xs={12}>
                <Select
                  labelId="dropdown-age-label"
                  id="dropdown-age"
                  fullWidth
                  value={age}
                  onChange={handleChange}
                >
                  <MenuItem value={22}>18-25</MenuItem>
                  <MenuItem value={27}>25-30</MenuItem>
                  <MenuItem value={35}>30-40</MenuItem>
                  <MenuItem value={50}>40-60</MenuItem>
                  <MenuItem value={70}>60-80</MenuItem>
                </Select>
              </Grid>
              <Typography sx={{ fontWeight: 'bold' }}>
                Group size
              </Typography>
              <Grid item xs={12}>
                <Select
                  labelId="dropdown-size-label"
                  id="dropdown-size"
                  fullWidth
                // value={size}
                // onChange={handleSize}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5+</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12}>
                <Typography
                >
                  Interests
                </Typography>
              </Grid>
              <Grid sx={{ marginRight: 12, marginLeft: 5 }}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox color="success" onChange={handleCheckbox} />
                    }
                    label="Sports"
                    value="Sports"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox color="success" onChange={handleCheckbox} />
                    }
                    label="Music"
                    value="Music"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox color="success" onChange={handleCheckbox} />
                    }
                    label="Reading"
                    value="Reading"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox color="success" onChange={handleCheckbox} />
                    }
                    label="Cooking"
                    value="Cooking"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox color="success" onChange={handleCheckbox} />
                    }
                    label="Dancing"
                    value="Dancing"
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox color="success" onChange={handleCheckbox} />
                    }
                    label="Pets"
                    value="Pets"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox color="success" onChange={handleCheckbox} />
                    }
                    label="Politics"
                    value="Politics"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox color="success" onChange={handleCheckbox} />
                    }
                    label="Photography"
                    value="Photography"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox color="success" onChange={handleCheckbox} />
                    }
                    label="Partying"
                    value="Partying"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox color="success" onChange={handleCheckbox} />
                    }
                    label="Art"
                    value="Art"
                  />
                </FormGroup>
              </Grid>
              <Typography sx={{ fontWeight: 'bold' }}>
                Date
              </Typography>
              <Grid item xs={12} sm={6} md={6} >
                <FormTextField
                  id="datetime-local"
                  required
                  type="datetime-local"
                  defaultValue="2022-02-24T10:30"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register('date')}
                />
              </Grid>

              <Grid sx={{ marginTop: 2, marginRight: 12, marginLeft: 5, textAlign: 'left' }}>
                <Button variant="contained"
                  size="small"
                  style={{ background: '#33792F' }}
                  onClick={handleFilter}>
                  Filter
                </Button>
              </Grid>
            </Box>
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
