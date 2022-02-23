import React from 'react';
import './App.css';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import SignUpView from '../../pages/SignUpView';
import SignIn from '../../pages/SignInView';
import NoUserRoute from '../routes/NoUserRoute';
import PrivateRoute from '../routes/PrivateRoute';
import DashboardView from '../../pages/DashboardView';
import GroupsOverviewPage from '../../pages/GroupsOverview';
import CreateGroup from '../../pages/CreateGroup';

export const example = (x: number, y: number) => x + y;

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardView />} />
        <Route path="/groups" element={<GroupsOverviewPage />} />
        <Route path="/CreateGroup" element={<CreateGroup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUpView />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
