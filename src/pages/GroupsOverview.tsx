import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea, CardActions } from '@mui/material';
import React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Group } from '../types/group';
import Navbar from '../components/Navbar/Navbar';

const globalGroups: Group[] = [];

export default function GroupsOverviewPage() {
  // const [group, setGroup] = useState<Group>();
  console.log(globalGroups);

  // const printGroup = () => {
  //  const anyGroup = group as any;
  //  console.log(anyGroup.id);
  //  console.log(globalGroups.length);
  // };

  return (
    <Box sx={{ flexGrow: 2 }}>
      <Navbar />
      <Button>print</Button>

      <Grid container sx={{ p: 10 }} spacing={3} justifyContent="center">
        {globalGroups
          && globalGroups.map((g) => (
            <Grid item key={g.id} xs="auto" sm="auto" md="auto">
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <Grid container justifyContent="center" sx={{ p: 3 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 120, height: 120 }}
                    />
                  </Grid>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {g.id}
                    </Typography>

                    <Stack direction="row" spacing={1} sx={{ p: 2 }}>
                      <Chip label="Fest" color="primary" />
                      <Chip label="Sport" color="success" />
                    </Stack>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ justifyContent: 'center' }}
                    >
                      {g.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions>
                  <Grid container justifyContent="center">
                    <AvatarGroup max={10}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      <Avatar
                        alt="Travis Howard"
                        src="/static/images/avatar/2.jpg"
                      />
                      <Avatar
                        alt="Cindy Baker"
                        src="/static/images/avatar/3.jpg"
                      />
                      <Avatar
                        alt="Agnes Walker"
                        src="/static/images/avatar/4.jpg"
                      />
                      <Avatar
                        alt="Trevor Henderson"
                        src="/static/images/avatar/5.jpg"
                      />
                    </AvatarGroup>
                  </Grid>
                </CardActions>

                <CardActions>
                  <Grid container justifyContent="center">
                    <Button
                      variant="contained"
                      size="small"
                      style={{ background: '#000000' }}
                    >
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
