import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';

const Profile = () => (
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
          // src={user.avatar}
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
  </Card>
);

export default Profile;
