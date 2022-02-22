import { Box } from '@mui/material';
import Link from '@mui/material/Link';

const SideBar = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        minWidth: '201px',
        backgroundColor: '#fff',
        border: 'solid 1px #ACACAC',
        padding: '15px',
      }}
    >
      <Box sx={{ width: '40px' }}>
        <img src="logo512.png" alt="groupup" width={70} height={70}></img>
      </Box>
      <Box sx={{ marginTop: '50px', display: 'flex', padding: 1 }}>
        <Link
          href="/"
          variant="body2"
          sx={{
            fontWeight: 600,
            color: '#818181',
            fontSize: '14px',
            '&:hover': { color: '#000', underline: 'none' },
          }}
        >
          Dashboard
        </Link>
      </Box>
    </Box>
  );
};

export default SideBar;
