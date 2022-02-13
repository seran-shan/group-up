import React from 'react';
import './App.css';
import SignUp from '../../pages/SignUp';

export const example = (x: number, y: number) => x + y;

function App() {
  return (
    <div className="App">
      <SignUp />
    </div>
  );
}

export default App;
