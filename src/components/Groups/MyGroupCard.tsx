import React, { FC, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import VisibilityIcon from '@mui/icons-material/Visibility';

import { getUserByID } from '../../services/Firebase';

import { useAuth } from '../../provider/AuthProvider';
import { User } from '../../types/profile';

interface GroupCardProps {
  name: string;
  date: string;
  description: string;
  users: string[];
  interests: string[];
  id: string;
  admin: string;
}

const MyGroupCard: FC<GroupCardProps> = ({
  name,
  date,
  description,
  users,
  interests,
  id,
  admin,
}) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const handleNav = () => {
    navigate(`/groups/${id}`);
  };

  const [myUser, setMyUser] = useState('');

  const handleMyUser = async () => {
    if (user) {
      await getUserByID(user?.uid).then((data: any) => {
        setMyUser(data.email);
      });
    }
  };

  const [adminUser2, setAdminUser] = useState<string | null>();

  const getAdmin = async () => {
    const adminUser = await getUserByID(admin);
    if (adminUser == null) {
      return;
    }

    const theUser = adminUser as unknown as User;
    setAdminUser(theUser?.email);
  };

  useEffect(() => {
    getAdmin();
    handleMyUser();
  }, []);

  return (
    <Card sx={{ width: '350px', marginBottom: '100px' }}>
      {myUser === adminUser2 && (
        <Chip
          sx={{
            backgroundColor: '#29C',
            fontWeight: 600,
            color: 'white',
            marginTop: '10px',
          }}
          label="You are Admin"
        ></Chip>
      )}
      <CardHeader title={name} sx={{ pt: 3 }} />

      <Stack
        direction="row"
        spacing={1}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {interests.map((interest) => (
          <Chip
            sx={{
              backgroundColor: '#77DD77',
              fontWeight: 600,
              color: 'black',
              marginBottom: '10px',
            }}
            label={interest}
          />
        ))}
      </Stack>

      <p>{description}</p>

      <p>{users.length + 1} members</p>
      <p>{date}</p>

      <Grid item xs="auto" sm="auto" md="auto" justifyContent="space-between">
        <Button
          onClick={handleNav}
          variant="contained"
          startIcon={<VisibilityIcon />}
          size="small"
          style={{
            background: 'green',
            color: 'white',
            marginBottom: '10px',
          }}
        >
          View profile
        </Button>
      </Grid>
    </Card>
  );
};

export default MyGroupCard;
