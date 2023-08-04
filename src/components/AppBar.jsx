import React from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const AppBar = () => {
  return (
    <div className="flex m-auto items-center justify-center w-full p-4">
      <div className="flex items-center gap-3">
        <Link to="/">
          <img src={logo} className="h-16 object-contain" alt="chabi-logo" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">SquadShuffle</h1>
          <p>Où le hasard suscite le travail d'équipe !</p>
        </div>
      </div>
   
    </div>
  );
};

export default AppBar;
