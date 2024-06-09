import React from "react";
import { Navigate } from "react-router-dom";

function Logout() {
  localStorage.removeItem("ACCESS_TOKEN"); // Remove the access token from local storage
  localStorage.removeItem("REFRESH_TOKEN"); // Remove the refresh token from local storage
  return <Navigate to="/login" replace />; // Navigate to the login page
}

export default Logout;
