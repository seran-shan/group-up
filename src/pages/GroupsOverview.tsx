import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea, CardActions } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function GroupsOverviewPage() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

      <Grid container spacing={3} sx={{ p: 10 }} justifyContent="center">
        <Grid item xs={"auto"} sm="auto" md="auto" justifyContent="center">
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <Grid container justifyContent="center" sx={{ p: 3 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 120, height: 120 }} />
              </Grid>

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Group 1
                </Typography>

                <Stack direction="row" spacing={1} sx={{ p: 2 }} >
                  <Chip label="Fest" color="primary" />
                  <Chip label="Sport" color="success" />
                </Stack>

                <Typography variant="body2" color="text.secondary" style={{ justifyContent: 'center' }}>

                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
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

        <Grid container sx={{ p: 10 }} spacing={3} justifyContent="center" >
          <Grid item xs="auto" sm="auto" md="auto" justifyContent="center">
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <Grid container justifyContent="center" sx={{ p: 3 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 120, height: 120 }} />
                </Grid>

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Group 2
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ p: 2 }} >
                    <Chip label="Fest" color="primary" />
                    <Chip label="Sport" color="success" />
                  </Stack>

                  <Typography variant="body2" color="text.secondary" style={{ justifyContent: 'center' }}>

                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
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

          <Grid container sx={{ p: 10 }} spacing={3} justifyContent="center">
            <Grid item xs="auto" sm="auto" md="auto" justifyContent="center">
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <Grid container justifyContent="center" sx={{ p: 3 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 120, height: 120 }} />
                  </Grid>

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Group 3
                    </Typography>

                    <Stack direction="row" spacing={1} sx={{ p: 2 }} >
                      <Chip label="Fest" color="primary" />
                      <Chip label="Sport" color="success" />
                    </Stack>

                    <Typography variant="body2" color="text.secondary" style={{ justifyContent: 'center' }}>

                      Lizards are a widespread group of squamate reptiles, with over 6,000
                      species, ranging across all continents except Antarctica
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

            {/*  <Grid container>
          {groups.map(group => (
            <Grid item key={group.id} xs="auto" sm="auto" md="auto" >
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="fetch til bildet"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Fetche gruppenavn
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Fetche gruppebeskrivelse
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button variant="contained" size="small" color="primary" >
                    View profile
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid> */}


          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
