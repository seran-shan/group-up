import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAuth } from '../../provider/AuthProvider';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@mui/material';
import { User } from '../../types/profile';
import { createUser, getUserByID } from '../../services/Firebase';

import FormTextField from '../molecules/FormTextField';

import { useForm } from 'react-hook-form';

const ProfileDetail = () => {
  const { user, signout } = useAuth();

  const { register, handleSubmit, getValues } = useForm();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [birthday, setBirthday] = useState<Date>(new Date());

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
      var parsedUser = fUser as unknown as User;
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
  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={onSubmit}
      //   {...props}
    >
      <Card>
        <CardHeader subheader="Read only" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <FormTextField
                fullWidth
                label="First name"
                name="firstName"
                disabled={true}
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
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                disabled={true}
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
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                disabled={true}
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
            display: 'flex',
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
    </form>
  );
};

export default ProfileDetail;
