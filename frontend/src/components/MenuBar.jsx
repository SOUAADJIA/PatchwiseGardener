import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/MenuBar.css";

function MenuBar({ isAuthenticated }) {
  return (
    <div className="home-container">
      <div className="menu-bar">
        <div className="logo-container">
          <img src={logo} alt="Patchwise Gardener Logo" className="logo" />
          <h1 className="site-title">PatchwiseGardener</h1>
        </div>
        <ul className="nav-links">
          <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
          <li><NavLink to="/plants" activeClassName="active">Plants</NavLink></li>
          <li><NavLink to="/mygarden" activeClassName="active">My Garden</NavLink></li>
          <li><NavLink to="/plant-disease" activeClassName="active">Plant Disease</NavLink></li>
          <li><NavLink to="/faq" activeClassName="active">FAQ</NavLink></li>
          <li><NavLink to="/community" activeClassName="active">Community</NavLink></li>
          {!isAuthenticated && <li><NavLink to="/login" activeClassName="active" className="login-button">Log In</NavLink></li>}
          {isAuthenticated && <li><NavLink to="/logout" activeClassName="active" className="logout-button">Log Out</NavLink></li>}
        </ul>
      </div>
    </div>
  );
}

export default MenuBar;
