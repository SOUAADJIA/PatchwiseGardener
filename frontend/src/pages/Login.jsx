import React from "react";
import MenuBar from "../components/MenuBar";
import Form from "../components/Form";
import "../styles/Login.css"; 

function Login() {
  return (
    <div className="home-container">
      <div className="login-container">
        <MenuBar />
        <div className="login-background">
          <div className="form-wrapper">
            <Form route="/api/token/" method="login" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
