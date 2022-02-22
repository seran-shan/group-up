import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
  Button, CardActionArea, CardActions,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { getGroupByID } from '../services/Firebase';
import { Group } from '../types/group';

const globalGroups: Group[] = [];

export default function GroupsOverviewPage() {
  const [group, setGroup] = useState<Group>();
  console.log(globalGroups);

  const getGroup = async () => {
    await getGroupByID('PU').then((data) => {
      if (group !== undefined) {
        globalGroups.push(group);
      }
      setGroup(data);
    });
  };

  // getGroup()
  useEffect(() => {
    getGroup();
  }, []);

  const printGroup = () => {
    const anyGroup = group as any;
    console.log(anyGroup.id);
    console.log(globalGroups.length);
  };

  return (
    <Box sx={{ flexGrow: 2 }}>
      <AppBar position="static" style={{ background: '#16713A' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} align="center">
            Your Groups
          </Typography>
          <Button color="inherit">User logged in</Button>
        </Toolbar>
      </AppBar>
      <Button onClick={printGroup}>print</Button>

      <Grid container sx={{ p: 10 }} spacing={3} justifyContent="center">
        {globalGroups
          && globalGroups.map((g) => (
            <Grid item key={g.id} xs="auto" sm="auto" md="auto">
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <Grid container justifyContent="center" sx={{ p: 3 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 120, height: 120 }} />
                  </Grid>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {g.id}
                    </Typography>

                    <Stack direction="row" spacing={1} sx={{ p: 2 }}>
                      <Chip label="Fest" color="primary" />
                      <Chip label="Sport" color="success" />
                    </Stack>

                    <Typography variant="body2" color="text.secondary" style={{ justifyContent: 'center' }}>
                      {g.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions>
                  <Grid container justifyContent="center">
                    <AvatarGroup max={10}>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                      <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                      <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                    </AvatarGroup>
                  </Grid>
                </CardActions>

                <CardActions>
                  <Grid container justifyContent="center">
                    <Button variant="contained" size="small" style={{ background: '#000000' }}>
                      View profile
                    </Button>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}