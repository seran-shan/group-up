import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CloseIcon from '@mui/icons-material/Close';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Alert,
  Avatar,
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  IconButton,
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
  createGroups,
  findUserByEmail,
  getUserByID,
} from '../../services/Firebase';
import FormTextField from '../molecules/FormTextField';
import { useEffect, useState } from 'react';
import { User } from '../../types/user';
import { useAuth } from '../../provider/AuthProvider';

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
  const { user } = useAuth();

  const { register, getValues, handleSubmit } = useForm();

  const [emails, setEmails] = useState<string[]>([]);
  const [interests, setInterests] = React.useState<string[]>([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const [age, setAge] = React.useState('');

  const onSubmit = handleSubmit(async () => {
    console.log(user?.email);
    console.log(
      getValues('groupName'),
      getValues('description'),
      getValues('date'),
      age,
      interests,
      emails
    );

    await createGroups(
      getValues('groupName'),
      getValues('description'),
      getValues('date'),
      age,
      interests,
      emails,
      user?.uid
    );
  });

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleCheckbox = (event: SelectChangeEvent) => {
    setInterests((oldArray) => [...oldArray, event.target.value as string]);
  };

  const handleMember = async () => {
    await findUserByEmail(getValues('members')).then((data) => {
      if (!data) {
        setOpenError(true);
        return;
      }
      setOpenSuccess(true);
      const res = data as unknown as User;
      setEmails((oldArray) => [...oldArray, res.email]);
    });
  };

  return (
    <Box sx={{ widht: '100%' }}>
      <Stack component="form" noValidate spacing={3} />
      <ThemeProvider theme={theme}>
        <Box component="main" width="100%">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '120px',
                marginTop: '30px',
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  fontWeight: 750,
                  fontSize: 25,
                  color: '#125A2E',
                  gridColumnStart: 2,
                  marginBottom: '23px',
                }}
              >
                Create Group
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  width: 244,
                  color: '#16713A',
                  margin: 'auto',
                }}
              >
                Create a group to meet lots of new people and experience new
                things!
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: '#ffffff',
                width: '134px',
                height: '32px',
                borderBottom: 'solid 0.2px #BFBFBF',
                margin: 'auto',
                marginBottom: '32px',
              }}
            />

            <Box sx={{ mt: 3, width: '500px' }}>
              <form onSubmit={onSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
                    <FormTextField
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
                    <FormTextField
                      id="datetime-local"
                      required
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
                    <FormTextField
                      id="description"
                      label="Description"
                      required
                      multiline
                      fullWidth
                      rows={4}
                      {...register('description')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel sx={{ color: '#125A2E' }}>Agelimit</InputLabel>
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

                  <Grid item xs={12}>
                    <Typography
                      component="h1"
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        fontSize: 22,
                        color: '#125A2E',
                        gridColumnStart: 2,
                        marginBottom: '10px',
                        marginTop: '20px',
                      }}
                    >
                      Interests
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: '#ffffff',
                        width: '134px',
                        height: '32px',
                        borderBottom: 'solid 0.2px #BFBFBF',
                        margin: 'auto',
                        marginBottom: '32px',
                      }}
                    />
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
                  </Grid>
                  <Grid sx={{ marginLeft: 3 }}>
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

                <Box
                  sx={{
                    marginTop: '40px',
                    borderRadius: 5,
                    backgroundColor: '#f1f1f1',
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: '#16913A',
                      height: '60px',
                      display: 'flex',
                      justifyContent: 'center',
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                    }}
                  >
                    <Typography
                      component="h1"
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        fontSize: 22,
                        color: '#f1f1f1',
                        gridColumnStart: 2,
                        marginBottom: '10px',
                        marginTop: '20px',
                      }}
                    >
                      Members
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: '100%',
                      height: '300px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'left',
                      padding: '20px',
                    }}
                  >
                    <p>(Admin) {user?.email}</p>
                    {emails.map((person) => {
                      return <p>(Member){person}</p>;
                    })}
                  </Box>
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
                    <Collapse in={openSuccess}>
                      <Alert
                        severity="success"
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                              setOpenSuccess(false);
                            }}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                        sx={{ mb: 2 }}
                      >
                        The user has been added
                      </Alert>
                    </Collapse>
                    <Collapse in={openError}>
                      <Alert
                        severity="error"
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                              setOpenError(false);
                            }}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                        sx={{ mb: 2 }}
                      >
                        We could not find that user
                      </Alert>
                    </Collapse>
                  </Box>
                </Modal>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: '#125A2E',
                    '&:hover': { backgroundColor: '#16913A' },
                  }}
                >
                  Create group
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  );
}
