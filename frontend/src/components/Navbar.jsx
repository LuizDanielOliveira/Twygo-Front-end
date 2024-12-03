import React from "react";
import "./Navbar.css";
import logo from "../assets/twygo-logo.png"; 

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Twygo Logo" className="navbar-logo-image" />
        </div>
        <div className="navbar-center">
          <h1 className="navbar-title">Cursos</h1>
        </div>
      </nav>
      <div className="navbar-wave"></div>
    </div>
  );
};

export default Navbar;
