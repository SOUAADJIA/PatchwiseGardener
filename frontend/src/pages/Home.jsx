import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>My Home page</h1>
      <p>Welcome to my web app PATCHWISEGARDER!</p>
      <nav>
        <ul>
          <li>
            <NavLink to="/home" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/plants" activeClassName="active">
              Plants
            </NavLink>
          </li>
          <li>
            <NavLink to="/mygarden" activeClassName="active">
              My Garden
            </NavLink>
          </li>
          <li>
            <NavLink to="/community" activeClassName="active">
              Community
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" activeClassName="active">
              Registration
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" activeClassName="active">
              Log In
            </NavLink>
          </li>
          <li>
            <NavLink to="/logout" activeClassName="active">
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
