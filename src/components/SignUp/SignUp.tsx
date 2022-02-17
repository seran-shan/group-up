import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useForm } from 'react-hook-form';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function SignUp() {
  const { register, handleSubmit } = useForm();

  // const { signup } = useAuth();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  // try {
  // await signup(data, 'password');
  // await addDoc(collection(db, 'Users'), {
  // groupName: data.get('groupName'),
  // description: data.get('description'),
  // numOfMember: data.get('numOfMember'),
  // ageLimit: data.get('ageLimit'),
  // activityDate: data.get('activityDate'),
  // });
  // } catch (err) {
  // alert(err);
  // }
  // });

  return (
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
          <Box
            sx={{
              dispaly: 'flex',
              flexDirection: 'column',

              marginBottom: '60px',
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ marginBottom: '23px', fontWeight: 700, fontSize: 25 }}
            >
              Sign up
            </Typography>
            <Typography sx={{ fontSize: 11, width: 244 }}>
              Join GroupUp to meet new people and experience new things
            </Typography>
          </Box>

          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register('firstName')}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoComplete="family-name"
                  {...register('lastName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type="text"
                  autoComplete="email"
                  {...register('email')}
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                backgroundColor: '#ffffff',
                width: '134px',
                height: '32px',
                borderBottom: 'solid 0.2px #000',
                margin: 'auto',
                marginBottom: '32px',
              }}
            />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register('password')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register('confirmPassword')}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
