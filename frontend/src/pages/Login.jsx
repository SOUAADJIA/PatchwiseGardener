import React from "react";
import Form from "../components/Form";
import { NavLink } from "react-router-dom";
import "../styles/Login.css"; 

function Login() {
  return (
    <div className="home-container">
      <div className="login-container">
        <div className="login-background">
          <div className="form-wrapper">
            <Form route="/api/token/" method="login" />
            <div className="signup-link-container">
              <p>Don't have an account?</p>
              <NavLink to="/register" className="signup-link">Sign Up</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
