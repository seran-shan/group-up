import React, { useEffect } from 'react';
import './App.css';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import SignUpView from '../../pages/SignUpView';
import SignIn from '../../pages/SignInView';
import Profile from '../../pages/ProfileView';
import CreateGroupView from '../../pages/CreateGroupView';
import GroupView from '../../pages/GroupView';
import MyGroupsView from '../../pages/MyGroupsView';
import GroupProfileView from '../../pages/GroupProfileView';
import { Group } from '../../types/group';
import { getAllGroups } from '../../services/Firebase';
import { useAuth } from '../../provider/AuthProvider';

export const example = (x: number, y: number) => x + y;

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GroupView />} />
          <Route path="/CreateGroup" element={<CreateGroupView />} />
          <Route path="/myGroups" element={<MyGroupsView />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUpView />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/groups/:id" element={<GroupProfileView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
