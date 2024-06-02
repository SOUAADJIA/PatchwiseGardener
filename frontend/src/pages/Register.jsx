import React from "react";
import MenuBar from "../components/MenuBar";
import Form from "../components/Form";
import "../styles/Register.css"; 

function Register() {
  return (
    <div className="register-container">
      <MenuBar />
      <div className="register-background">
        <div className="form-wrapper">
          <Form route="/api/user/register/" method="register" />
        </div>
      </div>
    </div>
  );
}

export default Register;