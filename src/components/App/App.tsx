import React from 'react';
import './App.css';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import SignUpView from '../../pages/SignUpView';
import SignIn from '../../pages/SignInView';
import Profile from '../../pages/ProfileView';
import CreateGroupView from '../../pages/CreateGroupView';
import GroupView from '../../pages/GroupView';
import MyGroupsView from '../../pages/MyGroupsView';
import GroupProfileView from '../../pages/GroupProfileView';
import NoUserRoute from '../routes/NoUserRoute';
import PrivateRoute from '../routes/PrivateRoute';
import Admin from '../Admin/Admin';

export const example = (x: number, y: number) => x + y;

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route element={<NoUserRoute />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUpView />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<GroupView />} />
          <Route path="/CreateGroup" element={<CreateGroupView />} />
          <Route path="/myGroups" element={<MyGroupsView />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/groups/:id" element={<GroupProfileView />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
