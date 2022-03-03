import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { useForm } from 'react-hook-form';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../provider/AuthProvider';
import FormTextField from '../molecules/FormTextField';
import FormDatePicker from '../molecules/FormDatePicker';

const theme = createTheme();

export default function SignUp() {
  const { register, handleSubmit, getValues } = useForm();

  const [minDate, setMinDate] = useState<Date>();
  const [date, setDate] = useState<Date | null>(null);
  const { signup } = useAuth();
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const { user } = useAuth();

  const onSubmit = handleSubmit(async () => {
    if (getValues('password').length < 6) {
      setErrorMsg('Password must be more than 6 characters long');
      setOpen(true);
    } else if (getValues('password') !== getValues('confirmPassword')) {
      setErrorMsg('Passwords do not match');
      setOpen(true);
    } else if (date == null) {
      setErrorMsg('You must select a birth date');
      setOpen(true);
    } else {
      try {
        await signup(
          getValues('email'),
          getValues('password'),
          getValues('firstName'),
          getValues('lastName'),
          date
        );
        if (user == null) {
          return;
        }
        navigate('/');
      } catch (err) {
        setErrorMsg(
          'Something went wrong when creating the user, please check that the email is valid'
        );
        setOpen(true);
      }
    }
  });

  const getMinDate = () => {
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setTime(
      eighteenYearsAgo.valueOf() - 18 * 365 * 24 * 60 * 60 * 1000
    );
    setMinDate(eighteenYearsAgo);
  };

  useEffect(() => {
    getMinDate();
  }, []);

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
              display: 'flex',
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
                <FormTextField
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
                <FormTextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoComplete="family-name"
                  {...register('lastName')}
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  fullWidth
                  required
                  id="email"
                  label="Email Address"
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                />
              </Grid>

              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                sx={{ width: '100%' }}
              >
                <Grid item xs={12}>
                  <FormDatePicker
                    label="Birth Year"
                    value={date}
                    maxDate={minDate}
                    onChange={(newValue: any) => {
                      setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              </LocalizationProvider>
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
                <FormTextField
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
                <FormTextField
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
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#125A2E',
                '&:hover': { backgroundColor: '#16913A' },
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link
                  href="/signin"
                  variant="body2"
                  sx={{ color: '#16713A', textDecoration: 'none' }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Collapse in={open}>
          <Alert
            severity="error"
            action={(
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            )}
            sx={{ mb: 2 }}
          >
            {errorMsg}
          </Alert>
        </Collapse>
      </Container>
    </ThemeProvider>
  );
}
