import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Plants from "./pages/Plants";
import CareGuides from "./pages/CareGuides.jsx";
import MyGarden from "./pages/MyGarden";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Community from "./pages/Community";
import PlantDisease from "./pages/PlantDisease";
import FAQ from "./pages/FAQ";
import MenuBar from "./components/MenuBar";
import Footer from "./components/Footer";

function Logout({ setIsAuthenticated }) {
  useEffect(() => {
    localStorage.clear();
    setIsAuthenticated(false);
  }, [setIsAuthenticated]);

  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <BrowserRouter> {/* Add MenuBar component here */}
      <MenuBar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/mygarden"
          element={
            <ProtectedRoute>
              <MyGarden />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          }
        />
        <Route path="/plants" element={<Plants />} />
        <Route path="/care-guides/:speciesId" element={<CareGuides />} />
        <Route path="/plant-disease" element={<PlantDisease />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer /> {/* Add Footer component here */}
    </BrowserRouter>
    
  );
}

export default App;
