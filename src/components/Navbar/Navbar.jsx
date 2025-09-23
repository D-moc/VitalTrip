import React, { useState } from "react";
import "./Navbar.css";
import { FaUserCircle, FaSearch, FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <span className="logo-highlight">VITAL</span>Trip
        </div>

        {/* Hamburger (Mobile) */}
        <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Links */}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><a href="#home" onClick={() => setIsOpen(false)}>Home</a></li>
          <li><a href="#explore" onClick={() => setIsOpen(false)}>Explore</a></li>
          <li><a href="#plan" onClick={() => setIsOpen(false)}>Plan Trip</a></li>
          <li><a href="#health" onClick={() => setIsOpen(false)}>Health Hub</a></li>
          <li><a href="#assistant" onClick={() => setIsOpen(false)}>Assistant</a></li>
        </ul>

        {/* Icons */}
        <div className="nav-icons">
          <FaUserCircle className="icon" />
          <FaSearch className="icon" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar
