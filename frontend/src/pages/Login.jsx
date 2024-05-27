
import React from "react";
import MenuBar from "../components/MenuBar";
import Form from "../components/Form";
import "../styles/Login.css"; 

function Login() {
  return (
    <div className="login-container">
      <MenuBar /> {/* Include the MenuBar component */}
      <div className="login-background">
        <div className="form-wrapper">
          <Form route="/api/token/" method="login" />
        </div>
      </div>
    </div>
  );
}

export default Login;
