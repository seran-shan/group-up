import React from "react";
import "./App.css";
import SignUp from "../../pages/SignUp";
import SignInView from "../../pages/SignInView";

export const example = (x: number, y: number) => {
  return x + y;
};

function App() {
  return (
    <div className="App">
      <SignInView />
    </div>
  );
}

export default App;
