import { styled, Link } from '@mui/material';

const focusedColor = '#548235';
const NavLink = styled(
  Link,
  {},
)(() => ({
  // input label when focused
  color: '#818181',
  fontWeight: 600,
  textDecoration: 'none',
  '&:hover': {
    color: '#000',
    cursor: 'pointer',
  },
}));

export default NavLink;
