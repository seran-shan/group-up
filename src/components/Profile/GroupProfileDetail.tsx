import React, { FC } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  Stack,
  TextField,
  Box,
} from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import FormDatePicker from '../molecules/FormDatePicker';
import FormTextField from '../molecules/FormTextField';

interface GroupProfileProps {
  description: string | undefined;
  name: string | undefined;
  users: string[] | undefined;
  interests: string[] | undefined;
  date: string | undefined;
  age: string | undefined;
}

const GroupProfileDetail: FC<GroupProfileProps> = ({
  description,
  name,
  users,
  interests,
  age,
  date,
}) => (
  <form autoComplete="off" noValidate>
    <Card>
      <CardHeader subheader="Read only" title={name} />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <FormTextField
              fullWidth
              label="Group Name"
              disabled
              name="Group-Name"
              InputLabelProps={{ shrink: true }}
              required
              value={name}
              variant="outlined"
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <FormTextField
              fullWidth
              disabled
              multiline
              maxRows={6}
              label="Description"
              InputLabelProps={{ shrink: true }}
              name="description"
              value={description}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <FormTextField
              fullWidth
              label="Age limit"
              name="age-limit"
              InputLabelProps={{ shrink: true }}
              disabled
              required
              value={age}
              variant="outlined"
            />
          </Grid>

          <Grid item md={12} xs={12}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              sx={{ width: '100%' }}
            >
              <Grid xs={12}>
                <FormDatePicker
                  label=""
                  value={date}
                  disabled
                  onChange={() => {}}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </LocalizationProvider>
          </Grid>
          <Grid item md={12} xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <p>Members:</p>
              {users?.map((person) => (
                <p>{person}</p>
              ))}
            </Box>
          </Grid>
          <Grid item md={12} xs={12}>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {interests?.map((interest) => (
                <Chip label={interest} color="success" />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
    </Card>
  </form>
);

export default GroupProfileDetail;
