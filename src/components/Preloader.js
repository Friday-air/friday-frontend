import React from "react";

export default function Preloader() {
  return (
    <div className="preloader ">
      <div className="loader ">
        <img
          src={require("../assets/img/logo.png")}
          alt="logo"
          className="h-12 m-auto"
        />
      </div>
    </div>
  );
}
