import React from 'react';
import './App.css';
import GroupsOverview from '../../pages/GroupsOverview';

export const example = (x: number, y: number) => x + y;

function App() {
  return (
    <div className="App">
      <GroupsOverview />
    </div>
  );
}

export default App;
