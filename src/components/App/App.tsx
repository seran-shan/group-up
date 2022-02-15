import React from 'react';
import './App.css';
import SignUp from '../../pages/SignUp';
import { AuthProvider } from '../../provider/AuthProvider';

export const example = (x: number, y: number) => x + y;

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <SignUp />
      </div>
    </AuthProvider>
  );
}

export default App;
