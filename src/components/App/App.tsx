import React from 'react';
import './App.css';
import SignUpView from '../../pages/SignUpView';
import SignIn from '../../pages/SignIn';
import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom';
import NoUserRoute from '../routes/NoUserRoute';
import PrivateRoute from '../routes/PrivateRoute';
import DashboardView from '../../pages/DashboardView';

export const example = (x: number, y: number) => x + y;

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<NoUserRoute />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUpView />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<DashboardView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
