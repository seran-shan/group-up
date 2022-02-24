import { styled, TextField } from '@mui/material';

const focusedColor = '#548235';
const FormTextField = styled(
  TextField,
  {}
)(() => ({
  // input label when focused
  '& label.Mui-focused': {
    color: focusedColor,
  },
  // focused color for input with variant='standard'
  '& .MuiInput-underline:after': {
    borderBottomColor: focusedColor,
  },
  // focused color for input with variant='filled'
  '& .MuiFilledInput-underline:after': {
    borderBottomColor: focusedColor,
  },
  // focused color for input with variant='outlined'
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: focusedColor,
    },
  },
}));

export default FormTextField;
