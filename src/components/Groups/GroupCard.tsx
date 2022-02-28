import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { Group } from '../../types/group';

const GroupCard: FC<Group> = ({
  name,
  date,

  users,
  interests,
}) => (
  <Card sx={{ width: '300px', marginBottom: '50px' }}>
    <CardHeader title={name} />

    <Stack
      direction="row"
      spacing={1}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      {interests.map((interest) => (
        <Chip color="success" label={interest} />
      ))}
    </Stack>
    <p>
      {users.length + 1}
      {' '}
      people
    </p>
    <p>{date}</p>
  </Card>
);

export default GroupCard;
