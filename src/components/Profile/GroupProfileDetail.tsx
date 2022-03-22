import React, { FC, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { v4 as uuidv4 } from 'uuid';
import FormDatePicker from '../molecules/FormDatePicker';
import FormTextField from '../molecules/FormTextField';
import { addReport, getUserByID } from '../../services/Firebase';

import { useAuth } from '../../provider/AuthProvider';

interface GroupProfileProps {
  description: string | undefined;
  name: string | undefined;
  users: string[] | undefined;
  interests: string[] | undefined;
  date: string | undefined;
  age: string | undefined;
}

const GroupProfileDetail: FC<GroupProfileProps> = ({
  description,
  name,
  users,
  interests,
  age,
  date,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (event: any) => {
    setOpen(true);
    setUserEmail(event.target.value);
  };
  const handleClose = () => setOpen(false);

  const [userEmail, setUserEmail] = useState('');
  const [reportDescription, setDescription] = useState('');

  const { user } = useAuth();

  const [openSuccess, setOpenSuccess] = useState(false);

  const handleReport = async () => {
    setOpenSuccess(true);
    const reporterID = user?.uid as string;
    const reporterData = await getUserByID(reporterID);
    const reportEmail = reporterData?.email as string;
    const id = uuidv4();

    await addReport(userEmail, reportEmail, reportDescription, id);
  };
  const style = {
    position: 'absolute' as 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #008000',
    boxShadow: 24,
    p: 4,
  };

  return (

    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader subheader="Read only" title={name} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <FormTextField
                fullWidth
                label="Group Name"
                disabled
                name="Group-Name"
                InputLabelProps={{ shrink: true }}
                required
                value={name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <FormTextField
                fullWidth
                disabled
                multiline
                maxRows={6}
                label="Description"
                InputLabelProps={{ shrink: true }}
                name="description"
                value={description}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <FormTextField
                fullWidth
                label="Age limit"
                name="age-limit"
                InputLabelProps={{ shrink: true }}
                disabled
                required
                value={age}
                variant="outlined"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                sx={{ width: '100%' }}
              >
                <Grid xs={12}>
                  <FormDatePicker
                    label=""
                    value={date}
                    disabled
                    onChange={() => {}}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              </LocalizationProvider>
            </Grid>
            <Grid item md={12} xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <p>Members:</p>
                {users?.map((person) => (
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <p>{person}</p>
                    <Button onClick={handleOpen} value={person} sx={{ mt: 3, backgroundColor: '#125A2E', '&:hover': { backgroundColor: '#16913A' } }}>
                      Report
                    </Button>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item md={12} xs={12}>
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {interests?.map((interest) => (
                  <Chip label={interest} color="success" />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Report:
          </Typography>
          <FormTextField
            label="Report message"
            value={reportDescription}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <Button
            variant="outlined"
            color="success"
            onClick={handleReport}
          >
            File report
          </Button>
          <Collapse in={openSuccess}>
            <Alert
              severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenSuccess(false);
                  }}
                >
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              The report has been filed
            </Alert>
          </Collapse>
        </Box>
      </Modal>
    </form>
  );
};

export default GroupProfileDetail;
