import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo */}
          <div className="nav-logo">
            <span className="logo-highlight">VITAL</span>Trip
          </div>

          {/* Menu */}
          <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>

          {/* Links */}
          <ul className={`nav-links ${isOpen ? "open" : ""}`}>
            <li><a href="#home">Home</a></li>
            <li><a href="#explore">Explore</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#blogs">Blogs</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          {/* Right Action */}
          <div className="nav-actions">
            <button className="btn" onClick={() => setShowAuth(true)}>
              Sign Up
            </button>
          </div>

          
        </div>
      </nav>
    </div>
  );
}

export default Navbar
