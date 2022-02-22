import DatePicker from '@mui/lab/DatePicker';
import { styled } from '@mui/material';

const focusedColor = '#548235';
const FormDatePicker = styled(
  DatePicker,
  {},
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

export default FormDatePicker;
