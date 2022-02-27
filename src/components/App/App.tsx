import React from 'react';
import './App.css';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import SignUpView from '../../pages/SignUpView';
import SignIn from '../../pages/SignInView';
import DashboardView from '../../pages/DashboardView';
import GroupsOverviewPage from '../../pages/GroupsOverview';
import CreateGroupView from '../../pages/CreateGroupView';

export const example = (x: number, y: number) => x + y;

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardView />} />
        <Route path="/groups" element={<GroupsOverviewPage />} />
        <Route path="/CreateGroup" element={<CreateGroupView />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUpView />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
