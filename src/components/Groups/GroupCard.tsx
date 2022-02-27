import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';

import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

import { Group } from '../../types/group';
import Typography from '@mui/material/Typography';

const GroupCard = (group: Group) => {
  console.log(group);
  return (
    <Card sx={{ width: '300px', marginBottom: '50px' }}>
      <CardHeader title={group.name}></CardHeader>
      <CardMedia
        component="img"
        height="194"
        image="https://d39l2hkdp2esp1.cloudfront.net/img/photo/170629/170629_00_2x.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography>{group.description}</Typography>
      </CardContent>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        {group.interests.map((interest) => {
          return <Chip color="success" label={interest} />;
        })}
      </Stack>
      <p>Members: {group.users.length}</p>
    </Card>
  );
};

export default GroupCard;
