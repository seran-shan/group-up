import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Avatar,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { useForm } from 'react-hook-form';
import {
  getAllUsers,
  createGroups,
  findUserByEmail,
} from '../services/Firebase';
import FormTextField from '../components/molecules/FormTextField';
import { useState } from 'react';
import { User } from '../types/user';

const theme = createTheme();

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

export default function createGroup() {
  const { register, getValues } = useForm();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createGroups(
      getValues('groupName'),
      getValues('description'),
      getValues('date'),
      age,
      interests,
      users
    );
  };

  const [interests, setInterests] = React.useState<string[]>([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [age, setAge] = React.useState('');

  const [users, setUsers] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleCheckbox = (event: SelectChangeEvent) => {
    setInterests((oldArray) => [...oldArray, event.target.value as string]);
  };

  const handleMember = async () => {
    await findUserByEmail(getValues('members')).then((data) => {
      if (!data) {
        return;
      }
      const res = data as unknown as User;
      setUsers([...users, res.email]);
    });
  };

  return (
    <>
      <Stack component="form" noValidate spacing={3} />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              sx={{ bgcolor: green[500], width: 60, height: 60 }}
              src="/images/avatar/bakgrun.jpg"
            />
            <Typography component="h1" variant="h5">
              New Group
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3, width: '500px' }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    autoComplete="given-name"
                    required
                    fullWidth
                    id="group-name"
                    label="Group name"
                    autoFocus
                    {...register('groupName')}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    id="datetime-local"
                    label="Next activity"
                    type="datetime-local"
                    defaultValue="2022-02-24T10:30"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register('date')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="description"
                    label="Description"
                    multiline
                    fullWidth
                    rows={4}
                    {...register('description')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography component="h1" variant="h6">
                    Interests
                  </Typography>
                </Grid>
                <Grid sx={{ marginRight: 12, marginLeft: 5 }}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox onChange={handleCheckbox} />}
                      label="Sports"
                      value="Sports"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={handleCheckbox} />}
                      label="Music"
                      value="Music"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={handleCheckbox} />}
                      label="Reading"
                      value="Reading"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={handleCheckbox} />}
                      label="Cooking"
                      value="Cooking"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={handleCheckbox} />}
                      label="Dancing"
                      value="Dancing"
                    />
                  </FormGroup>
                </Grid>
                <Grid sx={{ marginLeft: 3 }}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox onChange={handleCheckbox} />}
                      label="Pets"
                      value="Pets"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={handleCheckbox} />}
                      label="Politics"
                      value="Politics"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={handleCheckbox} />}
                      label="Photography"
                      value="Photography"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={handleCheckbox} />}
                      label="Partying"
                      value="Partying"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={handleCheckbox} />}
                      label="Art"
                      value="Art"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>Agelimit</InputLabel>
                  <Select
                    labelId="dropdown-age-label"
                    id="dropdown-age"
                    fullWidth
                    value={age}
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>18-25</MenuItem>
                    <MenuItem value={20}>25-30</MenuItem>
                    <MenuItem value={30}>30-40</MenuItem>
                    <MenuItem value={40}>40-60</MenuItem>
                    <MenuItem value={70}>60-80</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Button
                onClick={handleOpen}
                fullWidth
                variant="contained"
                sx={{
                  mt: 0,
                  mb: 0,
                  backgroundColor: '#125A2E',
                  '&:hover': { backgroundColor: '#16913A' },
                }}
              >
                Add members
              </Button>
              <Box
                sx={{
                  boxShadow: '1px 1px 1px 1px #A0A0A0',
                  marginTop: '30px',
                  mt: 0,
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '300px',
                  }}
                >
                  <Box>
                    <li>{users}</li>
                  </Box>
                </Box>
              </Box>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Add members to your group:
                  </Typography>
                  <FormTextField
                    label="Member Email"
                    {...register('members')}
                  ></FormTextField>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={handleMember}
                  >
                    Add member
                  </Button>
                </Box>
              </Modal>
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ mt: 2, mb: 2, mr: 2 }}
              >
                Create group
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
