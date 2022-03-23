import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
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
  width: 600,
  length: 100,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function GroupsOverview() {
  const [interests, setInterests] = React.useState<string[]>([]);

  console.log(interests);
  const handleCheckbox = (event: SelectChangeEvent) => {
    setInterests((oldArray) => [...oldArray, event.target.value as string]);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [groups, setGroups] = useState<Group[]>();
  const { user } = useAuth();
  const [age, setAge] = React.useState('');
  const [location, setLocation] = React.useState('');
  const { register, getValues } = useForm();
  const [size, setSize] = React.useState(0);

  const handleSize = (event: SelectChangeEvent) => {
    setSize(event.target.value as unknown as number);
  };

  const handleLocation = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleFilter = async () => {
    const extraGroups: Group[] = [];

    await getAllGroups().then((data) => {
      data.forEach((group) => {
        extraGroups.push(group);
      });

      data.forEach((group) => {
        if (user?.email == null) {
          return;
        }

        if (
          !group.users.includes(user?.email)
          && (!(group.admin === user?.uid)
          )) {
          if (location.length !== 0) {
            data.forEach((g) => {
              if ((g.location !== location)) {
                const index = extraGroups.indexOf(g);
                extraGroups.splice(index, index + 1);
              }
            });
          }

          if (size !== 0) {
            data.forEach((g) => {
              if (((g.users.length) !== size - 1)) {
                const index = extraGroups.indexOf(g);
                extraGroups.splice(index, index + 1);
              }
            });
          }

          if (interests.length !== 0) {
            console.log(interests);
            data.forEach((g) => {
              interests.forEach((interest) => {
                console.log(g.interests.includes(interest));
                if (!g.interests.includes(interest)) {
                  const index = extraGroups.indexOf(g);
                  extraGroups.splice(index, index + 1);
                }
              });
            });
          }

          if (getValues('date').length !== 0) {
            data.forEach((g) => {
              if (g.date !== getValues('date')) {
                const index = extraGroups.indexOf(g);
                extraGroups.splice(index, index + 1);
              }
            });
          }

          if (age.length !== 0) {
            data.forEach((g) => {
              if ((g.age !== age)) {
                const index = extraGroups.indexOf(g);
                extraGroups.splice(index, index + 1);
              }
            });
          }
        }
      });
      setGroups(extraGroups);
      setOpen(false);
      setInterests([]);
    });
  };

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
        }}
      >
        <Button
          onClick={handleOpen}
          variant="contained"
          size="small"
          style={{ background: '#33792F' }}
        >
          Filter groups
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              variant="h5"
              component="h2"
              sx={{ textAlign: 'center', m: 1, fontWeight: 'bold' }}
            >
              Filter groups
            </Typography>
            <Box
              sx={{
                textAlign: 'left',
                m: 1,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Stack component="form" noValidate spacing={3} />
              <Grid display="flex">
                <div>
                  <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="label-location">Location</InputLabel>
                    <Select
                      labelId="label-location"
                      id="label-age"
                      value={location}
                      onChange={handleLocation}
                      fullWidth
                      label="Location"
                    >
                      <MenuItem value="Moholt">Moholt</MenuItem>
                      <MenuItem value="Solsiden">Solsiden</MenuItem>
                      <MenuItem value="Midtbyen">Midtbyen</MenuItem>
                      <MenuItem value="Ila">Ila</MenuItem>
                      <MenuItem value="Lade">Lade</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="label-age">Age</InputLabel>
                    <Select
                      labelId="label-age"
                      id="label-age"
                      value={age}
                      onChange={handleChange}
                      fullWidth
                      label="Age"
                    >
                      <MenuItem value={22}>18-25</MenuItem>
                      <MenuItem value={27}>25-30</MenuItem>
                      <MenuItem value={35}>30-40</MenuItem>
                      <MenuItem value={50}>40-60</MenuItem>
                      <MenuItem value={70}>60-80</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="label-size">Size</InputLabel>
                    <Select
                      labelId="label-size"
                      id="label-size"
                      value={size}
                      onChange={handleSize}
                      fullWidth
                      label="Size"
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={7}>7</MenuItem>
                      <MenuItem value={8}>8</MenuItem>
                      <MenuItem value={9}>9</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Typography>Interests</Typography>
              </Grid>
              <Grid display="flex">
                <Grid sx={{ marginRight: 5, marginLeft: 2 }}>
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
                </Grid>
                <Grid sx={{ marginRight: 12, marginLeft: 5 }}>
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
              </Grid>
              <Typography>Date</Typography>
              <Grid item xs={12} sm={6} md={6}>
                <FormTextField
                  id="datetime-local"
                  required
                  type="datetime-local"
                  defaultValue="2022-02-24T10:30"
                  InputLabelProps={{
                    shrink: true
                  }}
                  {...register('date')}
                />
              </Grid>

              <Grid
                sx={{
                  marginTop: 2,
                  marginRight: 12,
                  marginLeft: 5,
                  textAlign: 'center',
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  style={{ background: '#33792F' }}
                  onClick={handleFilter}
                >
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
            superlikedGroups={group.superlikedGroups}
          />
        ))}
      </Box>
    </Box>
  );
}
