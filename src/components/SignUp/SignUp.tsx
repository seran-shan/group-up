import React, { useState } from 'react';
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
import { useAuth } from '../../provider/AuthProvider';

const theme = createTheme();

export default function SignUp() {
  const { register, handleSubmit, getValues } = useForm();

  const [date, setDate] = useState(new Date());

  const { signup } = useAuth();

  const onSubmit = handleSubmit(async () => {
    await signup(
      getValues('email'),
      getValues('password'),
      getValues('firstName')
    );
  });

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
              sx={{
                fontWeight: 750,
                fontSize: 25,
                color: '#125A2E',
                gridColumnStart: 2,
                marginBottom: '23px',
              }}
            >
              Sign up
            </Typography>

            <Typography
              sx={{
                fontSize: 12,
                width: 244,
                color: '#16713A',
              }}
            >
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
                borderBottom: 'solid 0.2px #BFBFBF',
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
                  id="newPassword"
                  autoComplete="new-password"
                  {...register('confirmPassword')}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#125A2E' }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
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
