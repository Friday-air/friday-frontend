import React from "react";
import { useNavigate } from "react-router-dom";
export default function App() {
  const navigate = useNavigate();
  return (
    <div className="App mt-10">
      <img
        src={require("../src/assets/img/logo.png")}
        className="h-10 m-auto"
        alt="logo"
      />

      <div className="mt-10">
        <button onClick={() => navigate("login")} className="btn-primary px-5">
          Login Now
        </button>
        <br />
        <button
          onClick={() => navigate("register")}
          className="btn-primary mt-2"
        >
          Create an account
        </button>
        <br />
      </div>
    </div>
  );
}
