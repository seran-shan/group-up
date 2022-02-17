import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


export default function GroupCard({ /*group*/ }) {
  return (
    <div>
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
    </div>
  )
}

