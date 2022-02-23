import { Box, Button, Link } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../../provider/AuthProvider';

const Navbar = () => {
  const { user, signout } = useAuth();
  const [dropdownDisplay, setDropdownDisplay] = useState('none');
  const handleLogout = async () => {
    await signout();
  };

  const handleDropdown = () => {
    if (dropdownDisplay == 'none') {
      setDropdownDisplay('flex');
    } else {
      setDropdownDisplay('none');
    }
  };
  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr',
          alignItems: 'center',
          width: '100%',
          height: '88px',
          backgroundColor: '#F9F9F9',
          boxShadow: '5px 5px 5px #ACACAC',
        }}
      >
        <Box sx={{ marginLeft: '40px' }}>
          {' '}
          <img src="logo512.png" width={60} height={60}></img>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginRight: '100px',
            marginLeft: '100px',
          }}
        >
          <Link sx={{ marginRight: '40px' }}>Dashboard</Link>
          <Link sx={{ marginRight: '40px' }}>My Groups</Link>
          <Link sx={{ marginRight: '40px' }}>Match</Link>
          <Link sx={{ marginRight: '40  px' }}>Profile</Link>
        </Box>
        <Box>
          <Button
            sx={{
              width: '40px',
              height: '60px',
              backgroundColor: '#000',
              borderRadius: '50%',
            }}
            onClick={handleDropdown}
          />
          <Button
            onClick={handleLogout}
            variant="contained"
            sx={{
              height: '30px',
              backgroundColor: '#D72638',
              '&:hover': {
                backgroundColor: '#AC1E2D',
              },
            }}
          >
            Log out
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
