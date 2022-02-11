import React from "react";
import "./App.css";
import SignUp from "../../pages/SignUp";

export const example = (x: number, y: number) => {
  return x + y;
};

function Login() {
  return (
    <div className="App">
      <SignUp />
    </div>
  );
}

export default Login;
