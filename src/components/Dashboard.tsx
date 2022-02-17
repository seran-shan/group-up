import { Button } from '@mui/material';
import { useAuth } from '../provider/AuthProvider';

const Dashboard = () => {
  const { user, signout } = useAuth();

  const handleLogout = async () => {
    await signout();
  };
  return (
    <div>
      <p>Dashboard</p>
      <p>{user?.email}</p>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Dashboard;
