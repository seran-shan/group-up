import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Snackbar,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../provider/AuthProvider';
import { User } from '../../types/profile';
import { createUser, getUserByID } from '../../services/Firebase';

import FormTextField from '../molecules/FormTextField';

const ProfileDetail = () => {
  const { user } = useAuth();

  const { handleSubmit } = useForm();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [visibility, setVisibility] = useState<boolean>(true);
  const [showSave, setSaveButton] = useState<string>('none');
  const [showEdit, setEditButton] = useState<string>('flex');
  const [readOnly, setHeader] = useState<string>('Read Only');

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const [date, setDate] = useState<string | unknown | null>(null);

  useEffect(() => {
    if (user === null) {
      console.log('Filed to load user');
      return;
    }
    getUserByID(user.uid).then((fUser) => {
      if (fUser == null) {
        console.log("Can't find user in firestore");
        return;
      }
      const parsedUser = fUser as unknown as User;
      setFirstName(parsedUser.firstName);
      setLastName(parsedUser.lastName);
      setEmail(parsedUser.email);
      setBirthday(parsedUser.birthday);
    });
  }, []);

  const onSubmit = handleSubmit(async () => {
    if (user == null) {
      return;
    }
    try {
      await createUser(firstName, lastName, email, birthday, user?.uid);
      handleOpen();
      handleVis();
    } catch (err) {
      console.log(err);
    }
  });

  const handleFirstName = (value: string) => {
    setFirstName(value);
  };

  const handleLastName = (value: string) => {
    setLastName(value);
  };

  const handleEmail = (value: string) => {
    setEmail(value);
  };

  const handleVis = () => {
    console.log(visibility);
    if (visibility === false) {
      setVisibility(true);
      setSaveButton('none');
      setEditButton('flex');
      setHeader('Read Only');
    } else {
      setVisibility(false);
      setSaveButton('flex');
      setEditButton('none');
      setHeader('');
    }
  };

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={onSubmit}
      //   {...props}
    >
      <Card>
        <CardHeader subheader={readOnly} title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <FormTextField
                fullWidth
                label="First name"
                name="firstName"
                disabled={visibility}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                required
                value={firstName}
                onChange={(e) => handleFirstName(e.target.value)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormTextField
                fullWidth
                label="Last Name"
                name="lastName"
                disabled={visibility}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                required
                value={lastName}
                onChange={(e) => handleLastName(e.target.value)}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <FormTextField
                fullWidth
                label="Email"
                name="email"
                disabled={visibility}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                required
                value={email}
                onChange={(e) => handleEmail(e.target.value)}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: `${showSave}`,
            justifyContent: 'center',
            p: 2,
          }}
        >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#125A2E',
              '&:hover': { backgroundColor: '#16913A' },
            }}
          >
            Save details
          </Button>
        </Box>
      </Card>
      <Box sx={{ display: `${showEdit}` }}>
        <Button
          onClick={handleVis}
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            top: 15,
            backgroundColor: '#125A2E',
            '&:hover': { backgroundColor: '#16913A' },
          }}
        >
          Edit Profile
        </Button>
      </Box>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Your profile has been updated
        </Alert>
      </Snackbar>
    </form>
  );
};

export default ProfileDetail;
