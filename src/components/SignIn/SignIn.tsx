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
import { useAuth } from '../../provider/AuthProvider';

const theme = createTheme();

export default function SignIn() {
  const { register, handleSubmit, getValues } = useForm();

  const { login } = useAuth();

  const onSubmit = handleSubmit(async () => {
    await login(getValues('email'), getValues('password'));
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
              sx={{
                marginBottom: '23px', fontWeight: 700, fontSize: 25, color: '#136031',
              }}
            >
              Welcome back!
            </Typography>
            <Typography sx={{ fontSize: 11, width: 244, color: '#16713A' }}>
              Join GroupUp to meet new people and have experience new things
            </Typography>
          </Box>

          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>

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

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign in
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid>
                <Link
                  href="/signup"
                  variant="body2"
                  sx={{ color: '#16713A' }}
                >
                  Not a user? Sign up
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
