import React from 'react';
import './App.css';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import SignUpView from '../../pages/SignUpView';
import SignIn from '../../pages/SignInView';
import NoUserRoute from '../routes/NoUserRoute';
import PrivateRoute from '../routes/PrivateRoute';
import DashboardView from '../../pages/DashboardView';
import GroupsOverviewPage from '../../pages/GroupsOverview';
import Profile from '../../pages/ProfileView';

export const example = (x: number, y: number) => x + y;

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route element={<NoUserRoute />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUpView />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<DashboardView />} />
          <Route path="/groups" element={<GroupsOverviewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
