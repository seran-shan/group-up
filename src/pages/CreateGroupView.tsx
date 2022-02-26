import { Box } from '@mui/material';
import CreateGroup from '../components/CreateGroups/CreateGroup';
import Navbar from '../components/Navbar/Navbar';

const CreateGroupView = () => {
  return (
    <Box>
      <Navbar />
      <CreateGroup />
    </Box>
  );
};

export default CreateGroupView;
