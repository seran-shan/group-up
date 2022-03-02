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
} from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import FormDatePicker from '../molecules/FormDatePicker';
import { Group } from '../../types/group';

interface GroupProfileProps {
    group: Group
}

const GroupProfileDetail: FC<GroupProfileProps> = ({ group }) => (
  <form
    autoComplete="off"
    noValidate
  >
    <Card>
      <CardHeader
        subheader="Read only"
        title={group?.name}
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
              label="Group Name"
              name="Group-Name"
              required
              value={group?.name}
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
              label="Age limit"
              name="age-limit"
              required
              value={group?.age}
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
              multiline
              maxRows={6}
              label="Description"
              name="description"
              value={group?.description}
              required
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              sx={{ width: '100%' }}
            >
              <Grid
                xs={12}
              >
                <FormDatePicker
                  label=""
                  value={group?.date}
                  onChange={() => {
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </LocalizationProvider>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            {group?.users.map((person) => <li>{person}</li>)}
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <Stack direction="row" spacing={1}>
              {group?.interests.map((interest) => <Chip label={interest} color="success" />)}
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
    </Card>
  </form>
);

export default GroupProfileDetail;
