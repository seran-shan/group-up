import React, { useEffect, useState } from 'react';
import { useAuth } from '../../provider/AuthProvider';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField
  } from '@mui/material';
import { User } from '../../types/profile';
import { getUserByID } from '../../services/Firebase';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import FormDatePicker from '../molecules/FormDatePicker';

const ProfileDetail = () => {
  const { user, signout } = useAuth();
  const [frUser, setFrUser] = useState<User>()
  // const [date, setDate] = useState<string | unknown | null>(null);

  useEffect(() => {

    if(user === null){
      console.log("Filed to load user")
        return
    }
    getUserByID(user.uid).then((fUser) => {
      if (fUser == null){
        console.log("Can't find user in firestore")
        return
      }
      var parsedUser = fUser as unknown as User;
      setFrUser(parsedUser)
    });
  });  

  // const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    
  // };

  // const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    
  // };

  const handleLogout = async () => {
    await signout();
  };
  return (
    <form
      autoComplete="off"
      noValidate
    //   {...props}
    >
      <Card>
        <CardHeader
          subheader="Read only"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                // onChange={(e) => setFrUser(frUser)}
                required
                value={frUser?.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                // onChange={handleChange}
                required
                value={frUser?.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                // onChange={handleChange}
                required
                value={frUser?.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                // onChange={(e) => setFrUser(frUser)}
                required
                value={frUser?.birthday}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                name="country"
                // onChange={handleChange}
                required
                
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                // onChange={handleChange}
                required
                value={frUser?.email}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box> */}
      </Card>
    </form>
  );
};

export default ProfileDetail;
