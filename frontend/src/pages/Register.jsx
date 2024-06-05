import React from "react";
import Form from "../components/Form";
import "../styles/Register.css"; 

function Register() {
  return (
    <div className="home-container">
      <div className="register-container">
        <div className="register-background">
          <div className="form-wrapper">
            <Form route="/api/user/register/" method="register" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;