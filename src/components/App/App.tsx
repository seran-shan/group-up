import React from 'react';
import './App.css';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import SignUpView from '../../pages/SignUpView';
import SignIn from '../../pages/SignInView';
import DashboardView from '../../pages/DashboardView';
import CreateGroupView from '../../pages/CreateGroupView';
import GroupView from '../../pages/GroupView';
import MyGroupsView from '../../pages/MyGroupsView';
import Profile from '../../pages/ProfileView';

export const example = (x: number, y: number) => x + y;

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardView />} />
        <Route path="/groups" element={<GroupView />} />
        <Route path="/CreateGroup" element={<CreateGroupView />} />
        <Route path="myGroups" element={<MyGroupsView />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUpView />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
