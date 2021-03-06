import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';

const GroupProfile = () => (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Avatar
          sx={{
            height: 64,
            mb: 2,
            width: 64,
          }}
        />
        <Typography color="textPrimary" gutterBottom variant="h5">
          {/* {user.name} */}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {/* {`${user.city} ${user.country}`} */}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {/* {user.timezone} */}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
  </Card>
);

export default GroupProfile;
